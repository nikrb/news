---
author: David Rajnoch
authorTwitter: https://twitter.com/DavidRajnoch
authorFacebook: false
title: "Why most startups should outsource their Machine Learning work."
subTitle: "People say that machine learning is going to change the way the internet works. It will make businesses smarter, more effective, and more..."
coverSrc: https://cdn-images-1.medium.com/max/1600/1*60Rh2d12uWpz1cpZB3MOvA.jpeg
url: https://medium.freecodecamp.org/why-most-startups-should-outsource-their-machine-learning-work-d98d89144223
id: why-most-startups-should-outsource-their-machine-learning-work-d98d89144223
date: 2017-10-26T21:11:46.999Z
tags: [
  "Machine Learning",
  "Technology",
  "Artificial Intelligence",
  "SaaS",
  "Startup"
]
---
# Why most startups should outsource their Machine Learning work.



![](https://cdn-images-1.medium.com/max/1600/1*60Rh2d12uWpz1cpZB3MOvA.jpeg)



People say that machine learning is going to change the way the internet works. It will make businesses smarter, more effective, and more informed. There will be higher click-through-rates, better content and product recommendation, and better customer segmentation.

The reality in 2017 is that there is a lack of programmers, more complexity, and a lack of quality tools. Generally, machine learning is raw, so no one wants to use it until it doubles revenue.

I come from an ML SaaS (Machine Learning Software as a Service) [company](https://vize.ai/). I would like to point out the value of companies providing Machine Learning as a service.

Machine learning is often connected with human perception.



![](https://cdn-images-1.medium.com/max/1600/1*E68w1_IytzJr-YkSIDem6w.png)

Machine learning is often connected with human perception



### **Introduction to Machine Learning**

When talking about machine learning, we usually mean supervised learning. It consists of input data such as sentences and labels such as sentiment = sad. This dataset trains a neural network for a specific task such as recognizing a sentiment of the paragraph.

More input means better understanding of the problem and more training data. This leads to more users, better neural network and better performance.



![](https://cdn-images-1.medium.com/max/1600/1*E4TkVt6UzQk0NiBA9brAmA.png)

This is an amazing feedback loop that comes with machine learning



A very important fact of ML is that training data must be the same as the data generated by user and system.

Apple trained [Siri](https://en.wikipedia.org/wiki/Siri) to understand English sentences by feeding it sound and text transcripts. If I ask Siri a question in Chinese, it will try to fit our syllables to English words and that won’t work.



![](https://cdn-images-1.medium.com/max/1600/1*tOq3l6aDEKyKSRMJCKy7kw.png)



### 1\. The Benefits of Machine Learning Outsourcing

#### Feedback Loop and Big Data

The amount of data beats it all. This is true for ML and it is also the main reason for outsourcing.

You will never get the same amount of voice data as Amazon from its Echo platform. You will never annotate the same amount of data as Google. For the most hardcore and data-driven applications you may go for SaaS. This includes Natural Language Processing (NLP), general image recognition, face recognition and sentiment analysis.

How do you recognize it? Ask yourself, “Can someone own 1,000 times more data than me?”.

The feedback loop is a win-win situation. A client gets the best solution and the company can build the best product on the market.

You have to test SaaS services and understand the fit of training and your data. If there is no fit there is no accuracy and SaaS will hardly invest time and resources to tweak a solution for you.

#### Development Time and Cost

ML experts are like Embedded-C programmers. Expensive and a rare species.

If you invest 3 months, 2 ML experts and 1 back-end developer to develop solutions it will cost 3*(2*(150K/4) + 110K/4) = 307K USD. That is 307/12 = 25 years of 1K/month SaaS service. Even at the half price of the development costs it will not change the game too much.

[TensorFlow](https://www.tensorflow.org/) is the most used ML library is still under development. With it, you still need to scale, update and orchestrate your solution.

This is a huge value of pay-as-you-go SaaS companies. They provide solutions that are cheap to test and fast to implement.







![](https://cdn-images-1.medium.com/max/2000/1*odsYsMO7cIw2WALRksb4fw.png)







#### **Knowledge of the Problem Structure**

Often the data and model are not the only challenges. We may know what the problem is, but the path to the solution is built by smart people.

You can buy knowledge and expertise by hiring the right people. But the best people in the industry are working for the most focused company.

SaaS gets the most relevant people and accumulates the knowledge based on the hundreds of customers they have worked with. It can show you obstacles and provide you with an extra functionality you hadn’t thought of.

#### ML Optimization and Meta-Learning

Having a lot of similar clients brings similar data under one roof. This offers the possibility to fine-tune neural networks to master the specific task.

The company focused on face recognition will provide the deepest understanding, most functionalities, and best performance for that task. This is a common knowledge, but it has an even bigger impact in machine learning.

A special case of optimization is [meta-learning](https://en.wikipedia.org/wiki/Meta_learning_%28computer_science%29). Our product is a trainable [image recognition](https://vize.ai/image-analytics). Every customer’s data is different. This does not allow us to fine-tune one neural network.

Instead, we change a model’s neural network parameters based on the available input data. We use thousands of dataset-model pairs. This allows us to analyze input data. Then we can choose the top 5 parameters combinations for each dataset. Only these models are trained. After the training, the best one is chosen and all 5 results can help to build better prediction for future.

In this way we replace a personal ML expert for each customer with more machine learning.



![](https://cdn-images-1.medium.com/max/1600/1*T-ws3Ym3rU-ktrrRyjgyAg.png)

Machine learning in 2017 is not replacing people’s jobs but helps people to work smarter



#### Infrastructure and DevOps

Scaling is important from the beginning. Machine learning execution time is usually higher than a simple database query. To build a robust architecture around TensorFlow with a continuous machine learning feedback loop takes work.

The typical stack for a deployed ML model is [Docker](https://www.docker.com/), [Kubernetes](https://kubernetes.io/), TensorFlow and some cloud provider like [AWS](https://aws.amazon.com/). It involves building a cloud-based scaling cluster, with an on-demand GPU powered training and annotation tool.

We have tried to deal with our own hardware but that is not a good way to start.



![](https://cdn-images-1.medium.com/max/1600/1*znS57xUZDI1eOY7Eu2HM5A.png)

Machine Learning [Stack](https://www.slideshare.net/PetteriTeikariPhD/deploying-deep-learning-models-with-docker-and-kubernete)



### 2\. The Negatives of Machine Learning Outsourcing

#### No Competitive Advantage

If there is no development there is no competitive advantage. SaaS provides a solution and its main focus is to scale it to as much as possible. At the same time, it becomes hard to develop something better than what SaaS provides.

If we have extra data that is not included in the SaaS solution it is interesting to build it. But if the provider covers 100% of what we need it is very hard to outperform it.

#### Specific Problems are Not Covered

Some data is too specific and there is no SaaS for it. For instance, there won’t be an SaaS for the prediction of a fishing score based on the pound analytics data. You have to develop it on your own.

In some areas, there might be a SaaS providing customizable solutions for a limited market. But be careful about solutions that are too general. They may provide only a GUI wrapper for TensorFlow as its only feature. This could cause limited functionality**.**



![](https://cdn-images-1.medium.com/max/1600/1*ASknPPy0Hgve5hbi0xOIgg.png)

Image from [www.unsplashed.com](http://www.unsplashed.com)



#### Data Sharing

Some companies operate with critical data, valuable data or personal data. ML SaaS companies must have to access the user data. There is no chance of end-user encryption. That strict privacy thinking has shifted a lot in the last few years.

In most cases, I would recommend working on a good Service Level Agreement (SLA) instead of working on an ML solution.

For big companies like Uber, Airbnb, and Pinterest where ML is the core technology and budgets are enormous, ML development is a must-have.

For other companies, there is a more important mission than replication of ML features.

#### Conclusion

As usual there is not a straight “yes”. Adoption of ML SaaS pretty much correlates with a popularity of SaaS provider with a single difference.

It is not so hard to build your own email marketing functionalities like [MailChimp](https://mailchimp.com/) if you need it. Yet it takes a lot of effort to build a click-through-rate recommendation system based on machine learning.

Some functionalities like Amazon voice recognition solution or Google’s general image recognition are almost impossible to reach with the same accuracy.

Any developer should do SaaS research before committing to sprint with the goal of building a machine learning feature in one month.

If you are interested in specialized image recognition technology you can visit our [learn page](https://vize.ai/learn) where you can find more details. Thank you for reading.

I have read a lot of articles that point to the future possibilities of AI and no one has ever come even close to it.

What I find of real value is:  
Text analysis, click-through-rate optimization, image analytics, content recommendation, Natural Language Processing, data mining and document understanding.

Here is a set of articles covering today’s AI-based solutions:  
A list of artificial intelligence tools you can use today   
—[for personal use](https://medium.com/imlyra/a-list-of-artificial-intelligence-tools-you-can-use-today-for-personal-use-1-3-7f1b60b6c94f) (1/3)  
 — [for businesses](https://lyr.ai/a-list-of-artificial-intelligence-tools-you-can-use-today%E2%80%8A-%E2%80%8Afor-businesses-2-continued/) (2/3)  
 — [for industry specific](https://medium.com/imlyra/a-list-of-artificial-intelligence-tools-you-can-use-today-for-industry-specific-3-3-5e16c68da697) (3/3)







