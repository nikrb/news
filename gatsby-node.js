const path = require('path');
const _ = require('lodash');
const { fromPromise } = require('rxjs/observable/fromPromise');
const { forkJoin } = require('rxjs/observable/forkJoin');
const { createFilePath } = require('gatsby-source-filesystem');
const getViewCount = require('./utils/getViewCount');

exports.onCreateNode = async({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode });
    createNodeField({
      node,
      name: 'slug',
      value: slug
    });
    const views = await getViewCount(node.frontmatter.id);
    createNodeField({
      node,
      name: 'viewCount',
      value: views
    });
  }
};

const instanceNameTemplateMap = {
  audio: 'Audio',
  text: 'Artice',
  video: 'Video'
};

function getTemplate(name) {
  return instanceNameTemplateMap[name] || 'Article';
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  const instanceNames$ = fromPromise(
    graphql(`
    {
      allFile(filter: {extension: {eq: "md"}}) {
        edges {
          node {
            absolutePath
          }
        }
      }
    }

    `)
  );
  const markdownNodes$ = fromPromise(
    graphql(`
    {
      allMarkdownRemark(filter: {fields: {slug: {ne: "/LICENSE/"}}}) {
        edges {
          node {
            fileAbsolutePath
            fields {
              slug
            }
          }
        }
      }
    }
    `)
  );
  return new Promise((resolve, reject) =>
    forkJoin(
      instanceNames$,
      markdownNodes$,
      (
        { data: { allFile: { edges: nameEdges } } },
        { data: { allMarkdownRemark: { edges: mdEdges } } }
      ) => {
        return mdEdges.map(md => {
          const eIndex = _.findIndex(
            nameEdges,
            name => name.absolutlePath === md.fileAbsolutePath
          );
          if (eIndex !== -1) {
            return {
              node: {
                ...md.node,
                ...nameEdges[eIndex].node
              }
            };
          }
          console.log(`Cannot find ${md.fileAbsolutePath}`);
          return md;
        });
      }
    )
    .subscribe(
      result => {
        result.forEach(({ node }) => {
          const { sourceInstanceName: name, fields: { slug } } = node;
          createPage({
            path: slug,
            component: path.resolve(`./src/templates/${getTemplate(name)}.jsx`),
            context: {
              // Data passed to context is available in page queries as
              // GraphQL variables.
              slug
            }
          });
        });
      },
      err => reject(err),
      resolve
    )
  );
};
