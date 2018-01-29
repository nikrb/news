import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';

import createStore from './src/redux/store';

function renderConnectedBody(reduxStore, body) {
  return <Provider store={reduxStore}>{body}</Provider>;
}
exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
  const store = createStore();
  const providerWrappedBodyString = renderToString(
    renderConnectedBody(store, bodyComponent)
  );
  replaceBodyHTMLString(providerWrappedBodyString);
};

exports.onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  setHeadComponents([
    <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
  ]);
  setPostBodyComponents([
    <script
      dangerouslySetInnerHTML={{
        __html: `
          if (window && window.netlifyIdentity) {
            window.netlifyIdentity.on("init", user => {
              if (!user) {
                window.netlifyIdentity.on("login", () => {
                  document.location.href = "/admin/";
                });
              }
            });
          }
        `
      }}
    />
  ]);
};
