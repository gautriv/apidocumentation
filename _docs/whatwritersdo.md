---
title: What Technical Writers Document in API Documentation
description: Discover the essential elements technical writers document in API documentation, including endpoints, methods, parameters, requests, responses, examples, error messages, authentication, and rate limits. Learn how API documentation serves as the crucial guidebook for developers.
keywords: API documentation components, technical writing for APIs, API endpoints documentation, API methods documentation, API parameters, API request response documentation, API error messages, API authentication documentation, rate limits documentation, reference API documentation, API documentation best practices, API documentation guide, technical writer role, API documentation structure, RESTful API documentation, API documentation examples, API reference guide, API technical writing, developer documentation, API endpoints, API methods, API parameters, API requests, API responses, API error codes, API authentication
permalink: whatwritersdo.html
summary: "This guide explains what technical writers document when creating API documentation. Learn about the key elements that make up comprehensive API documentation, including endpoints, methods, parameters, requests and responses, error codes, and authentication requirements. Perfect for new technical writers starting in API documentation."
next_page:
  url: /informationgathering.html
  title: How do Technical Writers document?
previous_page:
  url: /whatisanapi.html
  title: What is an API?
image: /assets/images/tech-writer-og.svg
last_modified_at: 2023-11-10T10:00:00+00:00
author_name: Documentation Specialist
author_description: Technical writer with 10+ years of experience documenting developer platforms
author_expertise: 
  - "API Documentation"
  - "Developer Experience"
  - "Technical Writing"
  - "Information Architecture"
author_image: /assets/images/technical-writer.svg
reading_time: 8
level: Beginner
speakable: true
speakable_selectors:
  - ".doc-content h1" 
  - ".doc-content h2"
  - ".doc-content p:first-of-type"
schema_markup: true
---

So, you're probably sitting there thinking, _"Okay, I know APIs are like menus or maps, but what exactly does a technical writer do with them? Do we just stare at code all day and hope inspiration strikes?"_

Not quite! Let me guide you through this chapter, where we'll uncover the role of technical writers in the API world. If you're feeling a little lost in the terminology, don't worry—that's why we're here. By the end of this, you'll know exactly what technical writers document and why they're the unsung heroes of the developer world.

{% include enhanced_note.html 
  title="Technical Writer's Role" 
  type="important" 
  collapsible=true 
  expanded=true 
  content="Technical writers are the bridge between complex API functionality and developer understanding. They transform technical specifications into clear, usable documentation that guides developers through API implementation." 
%}

## APIs Are Like New Cities
Picture this: You've just landed in a brand-new city. You're excited to explore, but you have no idea where the best coffee shops are, which streets to avoid, or how to navigate the subway system. Wandering around aimlessly might sound adventurous, but let's be real—you'd much rather have a map, a guidebook, or even a friendly local to point you in the right direction.

Now, imagine an API as that new city. It's full of possibilities, but without clear directions, it's easy to get lost. That's where we, the technical writers, step in. We create the "guidebook" for APIs, making sure developers know exactly how to get from point A to point B without a detour to frustration-ville.

  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7149683584202371"
      crossorigin="anonymous"></script>
  <!-- AddTitleOne -->
  <ins class="adsbygoogle"
      style="display:block"
      data-ad-client="ca-pub-7149683584202371"
      data-ad-slot="7422872052"
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
  <script>
      (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

{% include optimized-image.html 
  src="/assets/images/api-city-map.svg" 
  alt="Visualization of API documentation as a city map" 
  width="800" 
  height="500" 
  loading="lazy" 
  class="centered"
  caption="Technical writers create the guidebooks that help developers navigate the API city" 
%}

## The Reference API Document: Your Developer's Guidebook

Let's say your project team just created a shiny new endpoint (more on that in a second) and they turn to you, the technical writer, saying, "We need documentation!" Here's what they really mean: "Please make sense of this technical stuff so developers don't bombard us with questions."

So, what exactly goes into this guidebook? Let's break it down:

### 1. Endpoints: The API's Address Book
Endpoints are the URLs developers use to interact with the API. Think of them as addresses on a map. Each endpoint leads to a specific resource or action. For example:
- **GET** `/users`: Fetch a list of users.
- **POST** `/users`: Create a new user.

Endpoints tell developers, "Here's where you can find what you're looking for."

### 2. Methods: The Actions You Can Take
Methods are like verbs—they define what you can do with an endpoint. The most common ones are:
- **GET**: Retrieve data.
- **POST**: Add new data.
- **PUT**: Update existing data.
- **DELETE**: Remove data.

Think of these as the API's rules of engagement. Each endpoint may allow one or more methods.


### 3. Parameters: The Special Requests
Parameters are like specific instructions you give to the waiter. For instance, "I'll have the pizza, but hold the olives." In API terms, these are the values passed in a request, such as:
- **Query parameters**: `?userID=123` (specifies which user's data you want).
- **Path parameters**: `/users/{userID}` (the `{userID}` is dynamic and changes based on your request).

### 4. Requests and Their Bodies: The Ask
When a program interacts with an API, it sends a request. Sometimes, this request includes a "body," which is just a fancy way of saying "extra details." For example:

```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com"
}
```
This is what the API reads to figure out what you want.

### 5. Responses and Their Bodies: The Reply
After the request, the API responds. The response includes the requested data (if all goes well) or an error message (if something breaks). For example:

```json
{
  "status": "success",
  "data": {
    "userID": 123,
    "name": "Jane Doe"
  }
}
```
### 6. Examples: The Show-and-Tell
Developers love examples. They're like cheat codes for APIs. You provide sample requests and responses so developers can hit the ground running. For instance:

- Request: `GET /users/123`
- Response:

```json
{
  "id": 123,
  "name": "Jane Doe"
}
```

### 7. Error Messages: The Bad News
No one likes errors, but they're inevitable. Your job is to document the possible error messages and what they mean. For example:

- Error 400: Bad Request (you messed up the request).
- Error 401: Unauthorized (you forgot your API key).
- Error 500: Internal Server Error (the API messed up).

Bonus points if you include troubleshooting tips for each error!

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7149683584202371"
      crossorigin="anonymous"></script>
  <!-- AddTitleOne -->
  <ins class="adsbygoogle"
      style="display:block"
      data-ad-client="ca-pub-7149683584202371"
      data-ad-slot="7422872052"
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
  <script>
      (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

### 8. Authentication: The Bouncer at the Club
Before a developer can access an API, they often need to prove they're allowed in. This is called authentication, and it usually involves:

- API keys
- OAuth tokens
- Usernames and passwords

Think of this as the API saying, "No entry without ID!"

### 9. Rate Limits: The Speed Bumps
Rate limits are restrictions on how many requests a developer can make in a given time. For example, "You can only send 100 requests per minute." It's like a speed limit for APIs, ensuring no one abuses the system.

<div class="interactive-demo">
  <h4>Try it yourself: Identify Documentation Components</h4>
  <div class="demo-container">
    <div class="demo-controls">
      <button id="start-quiz-btn" class="btn-primary">Start Quiz</button>
    </div>
    <div class="demo-output">
      <div id="quiz-container">Click "Start Quiz" to test your knowledge about API documentation components</div>
      <div id="quiz-result"></div>
    </div>
  </div>
</div>

<style>
.interactive-demo {
  background: #f8f9fb;
  border-radius: 8px;
  padding: 15px;
  margin: 25px 0;
  border: 1px solid #e2e8f0;
}
.demo-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.demo-controls {
  display: flex;
  gap: 10px;
}
.btn-primary, .btn-secondary {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
}
.btn-primary {
  background: #4a6ef5;
  color: white;
}
.btn-secondary {
  background: #e2e8f0;
  color: #4a5568;
}
.demo-output {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  padding: 10px;
  min-height: 80px;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const startQuizBtn = document.getElementById('start-quiz-btn');
  const quizContainer = document.getElementById('quiz-container');
  const quizResult = document.getElementById('quiz-result');
  
  const quizQuestions = [
    {
      question: "Which component describes the URLs used to interact with an API?",
      options: ["Parameters", "Endpoints", "Methods", "Responses"],
      answer: "Endpoints"
    },
    {
      question: "What are HTTP verbs like GET, POST, PUT, DELETE called in API documentation?",
      options: ["Actions", "Verbs", "Methods", "Commands"],
      answer: "Methods"
    },
    {
      question: "What do we call restrictions on how many requests a developer can make in a given time?",
      options: ["Throttling", "Rate Limits", "Quota", "Usage Caps"],
      answer: "Rate Limits"
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  
  startQuizBtn.addEventListener('click', function() {
    currentQuestion = 0;
    score = 0;
    showQuestion();
  });
  
  function showQuestion() {
    if (currentQuestion < quizQuestions.length) {
      const q = quizQuestions[currentQuestion];
      let optionsHTML = '';
      
      q.options.forEach((option, index) => {
        optionsHTML += `<button class="option-btn btn-secondary" data-index="${index}">${option}</button>`;
      });
      
      quizContainer.innerHTML = `
        <div class="question">${q.question}</div>
        <div class="options">${optionsHTML}</div>
      `;
      
      document.querySelectorAll('.option-btn').forEach(button => {
        button.addEventListener('click', checkAnswer);
      });
    } else {
      showResults();
    }
  }
  
  function checkAnswer(e) {
    const selectedOption = e.target.textContent;
    const correctAnswer = quizQuestions[currentQuestion].answer;
    
    if (selectedOption === correctAnswer) {
      score++;
    }
    
    currentQuestion++;
    showQuestion();
  }
  
  function showResults() {
    quizContainer.innerHTML = `Quiz completed!`;
    quizResult.innerHTML = `You scored ${score} out of ${quizQuestions.length}`;
  }
});
</script>

Technical writers also document other aspects of APIs, such as the overall architecture, the security features, and the limitations. They strive to create documentation that is clear, concise, and accurate.

Here are some additional examples of what you might document in an API:

* The required permissions for each method.
* The expected format of the data that is passed to and returned by the API.
* The error codes that can be returned by the API and their meanings.
* The best practices for using the API.
* The limitations of the API.

So, just make sure you know what we document, how we do it; it's something we will talk about later in the course. In essence, Technical Writers craft an essential guide that empowers everyone to understand, navigate, and make the most of the API world.

Next up: [How Do Technical Writers Document APIs?]({{ '/informationgathering.html' | relative_url }}) Get ready to uncover the tricks of the trade!

{% include faq-section.html 
  title="Frequently Asked Questions About API Documentation"
  description="Get answers to common questions about what technical writers document in APIs and how they create effective documentation."
  data_file="tech_writer_faqs"
%}

{% include key_takeaways.html content="
<ul>
  <li>A reference API document includes endpoints, methods, parameters, requests, responses, examples, error messages, authentication, and rate limits.</li>
  <li>As a technical writer, your job is to make APIs easy to navigate and use, essentially creating a developer's guidebook.</li>
  <li>Properly documented APIs save development time, reduce support burden, and improve developer experience.</li>
  <li>Each component of API documentation serves a specific purpose in helping developers understand how to interact with the API.</li>
</ul>
" %}

<div class="author-cta">
  <img src="{{ site.baseurl }}/assets/images/gaurav.svg" alt="Technical Writing Expert" class="author-image">
  <div class="author-message">
    <h4>Was this guide helpful?</h4>
    <p>If you found this guide on what technical writers document valuable, please share it with your team or on social media. Your feedback helps us improve our content!</p>
    <div class="social-share">
      <a href="https://twitter.com/intent/tweet?url={{ site.url }}{{ page.url }}&text=Learn what technical writers document in APIs" class="share-button twitter">Share on Twitter</a>
      <a href="https://www.linkedin.com/shareArticle?mini=true&url={{ site.url }}{{ page.url }}&title=Technical Writing for APIs" class="share-button linkedin">Share on LinkedIn</a>
    </div>
  </div>
</div>

<style>
.author-cta {
  display: flex;
  background: #f8f9fb;
  border-radius: 8px;
  padding: 20px;
  margin: 30px 0;
  border: 1px solid #e2e8f0;
  gap: 20px;
  align-items: center;
}
.author-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}
.author-message {
  flex: 1;
}
.author-message h4 {
  margin-top: 0;
  margin-bottom: 8px;
}
.author-message p {
  margin-bottom: 12px;
}
.social-share {
  display: flex;
  gap: 10px;
}
.share-button {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  text-decoration: none;
  color: white;
}
.twitter {
  background: #1DA1F2;
}
.linkedin {
  background: #0077B5;
}
@media (max-width: 600px) {
  .author-cta {
    flex-direction: column;
    text-align: center;
  }
  .social-share {
    justify-content: center;
  }
}
</style>

{% include related_resources.html 
  title="Essential Technical Writing Resources"
  description="Enhance your technical writing skills with these carefully selected resources."
  external_links="Google's Technical Writing Guidelines,https://developers.google.com/tech-writing|API Documentation Best Practices,https://idratherbewriting.com/learnapidoc/|Write the Docs Community,https://www.writethedocs.org/|The Good Docs Project,https://thegooddocsproject.dev/"
  tools="Postman API Documentation Tools,https://www.postman.com/|Swagger OpenAPI Documentation,https://swagger.io/|ReadMe Developer Hub,https://readme.com/|Stoplight API Design Platform,https://stoplight.io/"
%}