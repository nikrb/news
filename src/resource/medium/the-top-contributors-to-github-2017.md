---
author: Felipe Hoffa
authorTwitter: https://twitter.com/felipehoffa
authorFacebook: none
title: "Who contributed the most to open source in 2017? Let’s analyze GitHub’s data and find out."
subTitle: "For this analysis we’ll look at all the PushEvents published by GitHub during 2017. For each GitHub user we’ll have to make our best gues..."
coverSrc: https://cdn-images-1.medium.com/max/2000/1*ywkHH3kMMVdGhXe6LDq7IA.png
url: https://medium.freecodecamp.org/the-top-contributors-to-github-2017-be98ab854e87
id: the-top-contributors-to-github-2017-be98ab854e87
date: 2017-10-24T21:01:28.141Z
tags: [
  "Data Science",
  "Open Source",
  "Bigquery",
  "Tech",
  "Programming"
]
---
# Who contributed the most to open source in 2017? Let’s analyze GitHub’s data and find out.







![](https://cdn-images-1.medium.com/max/2000/1*ywkHH3kMMVdGhXe6LDq7IA.png)







For this analysis we’ll look at all the `PushEvents` published by GitHub during 2017\. For each GitHub user we’ll have to make our best guess to determine to which organization they belong. We’ll only look at repositories that have received at least 20 stars this year.

Here are the results I got, which you can [tinker with in my the interactive Data Studio report](https://datastudio.google.com/open/0ByGAKP3QmCjLU1JzUGtJdTlNOG8).

### Comparing the top cloud providers

Looking at GitHub during 2017:

*   Microsoft appears to have ~1,300 employees actively pushing code to 825 top repositories on GitHub.
*   Google displays ~900 employees active on GitHub, who are pushing code to ~1,100 top repositories.
*   Amazon appears to have only 134 active employees on GitHub, pushing code to only 158 top projects.
*   Not all projects are equal: While Googlers are contributing code to 25% more repositories than Microsoft, these repositories have collected way more stars (530,000 vs 260,000). Amazon repositories sum of 2017 stars? 27,000.







![](https://cdn-images-1.medium.com/max/2000/1*EfhT-K6feRjyifX_K49AFg.png)







### RedHat, IBM, Pivotal, Intel, and Facebook

If Amazon seems so far behind Microsoft and Google — what are the companies in between? According to this ranking RedHat, Pivotal, and Intel are pushing great contributions to GitHub:

Note that the following table combines all of IBM regional domains — while the individual regions still show up in the subsequent tables.







![](https://cdn-images-1.medium.com/max/2000/1*KnaOtVpdmPFabCtk-saYUw.png)





![](https://cdn-images-1.medium.com/max/2000/1*Dy08nNIdjxBQRqQ6zXTThg.png)







Facebook and IBM (US) have a similar number of GitHub users than Amazon, but the projects they contribute to have collected more stars (especially Facebook):







![](https://cdn-images-1.medium.com/max/2000/1*ZJP36ojAFyo7BcZnJ-PT3Q.png)







Followed by Alibaba, Uber, and Wix:







![](https://cdn-images-1.medium.com/max/2000/1*yG3X8Sq35S8Z9mNLv9pliA.png)







GitHub itself, Apache, Tencent:







![](https://cdn-images-1.medium.com/max/2000/1*Ij2hSTZiQndHdFRsFNwb-g.png)







Baidu, Apple, Mozilla:







![](https://cdn-images-1.medium.com/max/2000/1*ZRjQ0fNe39-qox3cy6OGUQ.png)







Oracle, Stanford, Mit, Shopify, MongoDb, Berkeley, VmWare, Netflix, Salesforce, Gsa.gov:







![](https://cdn-images-1.medium.com/max/2000/1*mi1gdgVUYRbTBoBuo14gtA.png)







LinkedIn, Broad Institute, Palantir, Yahoo, MapBox, Unity3d, Automattic, Sandia, Travis-ci, Spotify:







![](https://cdn-images-1.medium.com/max/2000/1*yQzsoab7AFbQ2BTnPCGbXg.png)







Chromium, UMich, Zalando, Esri, IBM (UK), SAP, EPAM, Telerik, UK Cabinet Office, Stripe:







![](https://cdn-images-1.medium.com/max/2000/1*TCbZaq4sgpjFQ9f4yFoWoQ.png)







Cern, Odoo, Kitware, Suse, Yandex, IBM (Canada), Adobe, AirBnB, Chef, The Guardian:







![](https://cdn-images-1.medium.com/max/2000/1*zXxtygHJUi4tdNr1JRNlyg.png)







Arm, Macports, Docker, Nuxeo, NVidia, Yelp, Elastic, NYU, WSO2, Mesosphere, Inria







![](https://cdn-images-1.medium.com/max/2000/1*f6AK5xHrJIAhEn7t9569lQ.png)







Puppet, Stanford (CS), DatadogHQ, Epfl, NTT Data, Lawrence Livermore Lab:







![](https://cdn-images-1.medium.com/max/2000/1*RP5nyYdwn2d2pb05xnMxyA.png)







### My Methodology

#### How I linked GitHub users to companies

Determining the organization to which each GitHub user belongs it’s not easy — but we can use the email domains that show up in each commit message contained on PushEvents:

*   The same email can show up in more than one user, so I only considered GitHub users able to push code to GitHub projects with more than 20 stars during the period.
*   I only counted GitHub users with more than 3 pushes during the period.
*   Users pushing code to GitHub can display many different emails on their pushes — part of how Git works. To determine the organization for each user, I looked into the email their pushes shows up most frequently.
*   Not everyone uses their organization email on GitHub. There are a lot of gmail.com, users.noreply.github.com, and other email hosting providers. Sometimes the reason for this is anonymity and protecting their corporate inboxes — but if I couldn’t see their email domain, I couldn’t count them. Sorry.
*   Sometimes employees switch organizations. I assigned them to the one that got the more pushes according to these rules.

#### My query

<pre name="2ee3" id="2ee3" class="graf graf--pre graf-after--h4">#standardSQL  
WITH  
period AS (  
  SELECT *  
  FROM `githubarchive.month.2017*` a  
),  
repo_stars AS (  
  SELECT repo.id, COUNT(DISTINCT actor.login) stars, APPROX_TOP_COUNT(repo.name, 1)[OFFSET(0)].value repo_name   
  FROM period  
  WHERE type='WatchEvent'  
  GROUP BY 1  
  HAVING stars>20  
),   
pushers_guess_emails_and_top_projects AS (  
  SELECT *  
    # , REGEXP_EXTRACT(email, r'@(.*)') domain  
    , REGEXP_REPLACE(REGEXP_EXTRACT(email, r'@(.*)'), r'.*.ibm.com', 'ibm.com') domain  
  FROM (  
    SELECT actor.id  
      , APPROX_TOP_COUNT(actor.login,1)[OFFSET(0)].value login  
      , APPROX_TOP_COUNT(JSON_EXTRACT_SCALAR(payload, '$.commits[0].author.email'),1)[OFFSET(0)].value email  
      , COUNT(*) c  
      , ARRAY_AGG(DISTINCT TO_JSON_STRING(STRUCT(b.repo_name,stars))) repos  
    FROM period a  
    JOIN repo_stars b  
    ON a.repo.id=b.id  
    WHERE type='PushEvent'  
    GROUP BY  1  
    HAVING c>3  
  )  
)  
SELECT * FROM (  
  SELECT domain  
    , githubers  
    , (SELECT COUNT(DISTINCT repo) FROM UNNEST(repos) repo) repos_contributed_to  
    , ARRAY(  
        SELECT AS STRUCT JSON_EXTRACT_SCALAR(repo, '$.repo_name') repo_name  
        , CAST(JSON_EXTRACT_SCALAR(repo, '$.stars') AS INT64) stars  
        , COUNT(*) githubers_from_domain FROM UNNEST(repos) repo   
        GROUP BY 1, 2   
        HAVING githubers_from_domain>1   
        ORDER BY stars DESC LIMIT 3  
      ) top  
    , (SELECT SUM(CAST(JSON_EXTRACT_SCALAR(repo, '$.stars') AS INT64)) FROM (SELECT DISTINCT repo FROM UNNEST(repos) repo)) sum_stars_projects_contributed_to  
  FROM (  
    SELECT domain, COUNT(*) githubers, ARRAY_CONCAT_AGG(ARRAY(SELECT * FROM UNNEST(repos) repo)) repos  
    FROM pushers_guess_emails_and_top_projects  
    #WHERE domain IN UNNEST(SPLIT('google.com|microsoft.com|amazon.com', '|'))  
    WHERE domain NOT IN UNNEST(SPLIT('gmail.com|users.noreply.github.com|qq.com|hotmail.com|163.com|me.com|googlemail.com|outlook.com|yahoo.com|web.de|iki.fi|foxmail.com|yandex.ru', '|')) # email hosters  
    GROUP BY 1  
    HAVING githubers > 30  
  )  
  WHERE (SELECT MAX(githubers_from_domain) FROM (SELECT repo, COUNT(*) githubers_from_domain FROM UNNEST(repos) repo  GROUP BY repo))>4 # second filter email hosters  
)  
ORDER BY githubers DESC</pre>

### FAQ

#### **If an organization has 1,500 repositories, why do you only count 200? If a repository has 7,000 stars, why do you only show 1,500?**

I’m filtering for relevancy. I’m only counting stars given during 2017\. For example, Apache has >1,500 repositories on GitHub, but only 205 have received more than 20 stars this year.







![](https://cdn-images-1.medium.com/max/800/1*wf86s1GygY1u283nA6LoYQ.png)





![](https://cdn-images-1.medium.com/max/1600/1*vjycrF8zFYdJIBCV2HEkCg.png)







#### Is this the state of open source?

Note that analyzing GitHub doesn’t include top communities like Android, Chromium, GNU, Mozilla, nor the the Apache or Eclipse Foundation, and [other](https://developers.google.com/open-source/organizations) projects that choose to run most of their activities outside of GitHub.

#### **You were unfair to my organization.**

I can only count what I can see. Please challenge my assumptions and tell me how you would measure things in a better way. Working queries would be the best way.

For example, see how their ranking changes when I combine IBM’s region-based domains into their top one with one SQL transformation:

<pre name="9948" id="9948" class="graf graf--pre graf-after--p">SELECT *, REGEXP_REPLACE(REGEXP_EXTRACT(email, r'@(.*)'), r'.*.ibm.com', 'ibm.com') domain</pre>







![](https://cdn-images-1.medium.com/max/1200/1*sKjuzOO2OYPcKGAzq9jDYw.png)





![](https://cdn-images-1.medium.com/max/1200/1*ywkHH3kMMVdGhXe6LDq7IA.png)

IBM’s relative position moves significantly when you combine their regional email domains.







#### Reactions

[**Some thoughts on "the top contributors to GitHub 2017".**  
_Yesterday Felipe Hoffa from the Google Dev Rel team published some interesting research looking at corporate usage of…_redmonk.com](https://redmonk.com/jgovernor/2017/10/25/some-thoughts-on-the-top-contributors-to-github-2017/ "https://redmonk.com/jgovernor/2017/10/25/some-thoughts-on-the-top-contributors-to-github-2017/")[](https://redmonk.com/jgovernor/2017/10/25/some-thoughts-on-the-top-contributors-to-github-2017/)





<iframe data-width="500" data-height="185" width="500" height="185" src="https://medium.freecodecamp.org/media/078d6d92c98866a2d23fcf083d4b9cbb?postId=be98ab854e87" data-media-id="078d6d92c98866a2d23fcf083d4b9cbb" data-thumbnail="https://i.embed.ly/1/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F378800000407493871%2Fd60c34a9639e865fb61a7756644ab43a_400x400.jpeg&amp;key=a19fcc184b9711e1b4764040d3dc5c07" allowfullscreen="" frameborder="0"></iframe>





### Next steps

I’ve been wrong before — and it will probably happen again. Please take a look at all the raw data available and question all my assumptions — it will be cool to see what results you get.

[Play with the interactive Data Studio report](https://datastudio.google.com/open/0ByGAKP3QmCjLU1JzUGtJdTlNOG8).

Thanks to [Ilya Grigorik](https://medium.com/@igrigorik) for keeping [GitHub Archive](http://githubarchive.org) well fed and full of GitHub data all these years!

Want more stories? Check my [Medium](http://medium.com/@hoffa/), [follow me on twitter](http://twitter.com/felipehoffa), and subscribe to [reddit.com/r/bigquery](https://reddit.com/r/bigquery). And [try BigQuery](https://www.reddit.com/r/bigquery/comments/3dg9le/analyzing_50_billion_wikipedia_pageviews_in_5/)— every month you get a full terabyte of analysis for [free](https://cloud.google.com/blog/big-data/2017/01/how-to-run-a-terabyte-of-google-bigquery-queries-each-month-without-a-credit-card).

[**Leading with commas — ugly or efficient? An investigation over 320 GB of SQL code**  
_Winning arguments with data: Let’s analyze 320 Gigabytes of open source SQL code to determine if we should use trailing…_hackernoon.com](https://hackernoon.com/winning-arguments-with-data-leading-with-commas-in-sql-672b3b81eac9 "https://hackernoon.com/winning-arguments-with-data-leading-with-commas-in-sql-672b3b81eac9")[](https://hackernoon.com/winning-arguments-with-data-leading-with-commas-in-sql-672b3b81eac9)

[**Some coders like it hot — but most prefer colder climates**  
_Previously we found some of the major concentration of open source coders around pretty cold places (Iceland, Sweden…_hackernoon.com](https://hackernoon.com/some-coders-like-it-hot-but-most-prefer-colder-climates-4703c3f02fbb "https://hackernoon.com/some-coders-like-it-hot-but-most-prefer-colder-climates-4703c3f02fbb")[](https://hackernoon.com/some-coders-like-it-hot-but-most-prefer-colder-climates-4703c3f02fbb)








