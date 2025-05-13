---
title: Writing Effective API Documentation - A Complete Guide
description: Learn how to create clear, comprehensive API documentation that developers love. This guide covers structure, authentication, endpoints, parameters, examples, and best practices for technical writers.
keywords: API documentation, API reference documentation, writing API documentation, API endpoints documentation, API parameters, API authentication documentation, API request examples, API response examples, API documentation structure, REST API documentation, API documentation best practices, developer-friendly API docs, OpenAPI documentation, Swagger documentation, API reference guide, API technical writing, documenting API responses, API documentation template, API code examples, API error handling documentation, endpoint documentation, API status codes, API workflow documentation, API documentation tools, API developer portal
permalink: /writingapi.html
summary: "Master the art of creating effective API documentation that developers actually want to use. This comprehensive guide covers best practices for structuring API docs, documenting endpoints, providing clear examples, and handling errors to create a seamless developer experience."
next_page:
  url: /keyconcepts.html
  title: "Bridging the Gaps"
previous_page:
  url: /apirequestsresponses.html
  title: "API Requests and Responses"
image: /assets/images/api-docs-og.svg
last_modified_at: 2023-12-15T10:00:00+00:00
author_name: Documentation Expert
author_description: Senior technical writer specializing in API documentation with expertise in developer experience
author_expertise: 
  - "API Documentation"
  - "Developer Experience"
  - "Technical Writing"
  - "Information Architecture"
author_image: /assets/images/documentation-expert.svg
reading_time: 10
level: Intermediate
speakable: true
speakable_selectors:
  - ".doc-content h1" 
  - ".doc-content h2"
  - ".doc-content p:first-of-type"
schema_markup: true
---

Now that you understand [API requests and responses](/apidocumentation/apirequestsresponses.html), it's time to level up and learn **how to document them effectively!** Writing API documentation isn't just about listing endpoints and parameters—it's about making it **clear, concise, and developer-friendly**. 

In this chapter, we'll break down **how to structure API documentation** and write it in a way that **helps users get up and running quickly**.

{% include enhanced_note.html 
  title="API Documentation Impact" 
  type="important" 
  collapsible=true 
  expanded=true 
  content="Good API documentation reduces support tickets by up to 60% and accelerates developer onboarding. Statistics show that 86% of developers decide whether to use an API based on the quality of its documentation." 
%}

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

## 1. Structuring API Documentation for Maximum Usability

Great API documentation is **well-structured** and **easy to navigate**. Here's a solid structure to follow:

1. **Introduction** – What's the API about? Who is it for?
2. **Getting Started** – How to authenticate and make the first request.
3. **Authentication** – API keys, [OAuth](/apidocumentation/typesofAPI.html), or other authentication methods.
4. **Endpoints & Methods** – Each API endpoint with details.
5. **Parameters** – Query parameters, request bodies, and headers.
6. **Example Requests & Responses** – Real-world examples.
7. **Error Handling** – Common error responses and troubleshooting.
8. **Best Practices** – Performance tips, rate limits, and security.
9. **FAQs & Additional Resources** – Common questions and links.

Developers love **consistency**, so keeping your API documentation well-organized is key!

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

## 2. Writing a Clear API Introduction

Your **Introduction** should tell users **what your API does** and why they should use it. Keep it **short and to the point**.

### Example of a Good API Introduction:
> The **BookFinder API** allows developers to search for books, retrieve book details, and manage user reading lists. It supports both **[RESTful](/apidocumentation/restAPI.html)** and **GraphQL** requests, offering **real-time access** to a large database of books.

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

  
## 3. Documenting API Authentication Methods

APIs often require **authentication** to ensure security. Clearly explain how users can authenticate.

### Example: API Key Authentication Documentation

```http
GET https://api.example.com/books
Headers:
  Authorization: Bearer YOUR_API_KEY
```

Make sure to include:
- Where to find API keys (for example, in user settings).
- How to send them (for example, headers, query parameters).
- Any restrictions (for example, rate limits, expiration).


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



## 4. Explaining API Endpoints and Methods

For each **endpoint**, document:

- **URL** (`/books`)
- **HTTP Method** (`GET`, `POST`, `PUT`, `DELETE`)
- **Description** (What does this endpoint do?)
- **Parameters** (Query parameters, request body)
- **Example Request & Response**

---

### Example: Documenting an API Endpoint

#### **GET /books**
**Description:** Retrieves a list of books based on the search query.

<div class="table-container">
  <table class="custom-table">
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Type</th>
        <th>Required</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr class="highlight-row">
        <td><code>title</code></td>
        <td><span class="param-type string">string</span></td>
        <td><span class="badge bg-danger">No</span></td>
        <td>None</td>
        <td>Filter by book title</td>
      </tr>
      <tr>
        <td><code>author</code></td>
        <td><span class="param-type string">string</span></td>
        <td><span class="badge bg-danger">No</span></td>
        <td>None</td>
        <td>Filter by author name</td>
      </tr>
      <tr class="highlight-row">
        <td><code>limit</code></td>
        <td><span class="param-type number">integer</span></td>
        <td><span class="badge bg-danger">No</span></td>
        <td>10</td>
        <td>Number of books to return (max: 100)</td>
      </tr>
      <tr>
        <td><code>page</code></td>
        <td><span class="param-type number">integer</span></td>
        <td><span class="badge bg-danger">No</span></td>
        <td>1</td>
        <td>Page number for pagination</td>
      </tr>
      <tr class="highlight-row">
        <td><code>sort</code></td>
        <td><span class="param-type string">string</span></td>
        <td><span class="badge bg-danger">No</span></td>
        <td>"relevance"</td>
        <td>Sort order: "title", "date", "relevance"</td>
      </tr>
    </tbody>
  </table>
</div>

---

### **Example Request with Parameters**
```http
GET https://api.example.com/books?title=harry%20potter"
```

### **Example Response in JSON Format**

```json
{
  "books": [
    {
      "title": "Harry Potter and the Sorcerer's Stone",
      "author": "J.K. Rowling",
      "published_year": 1997
    }
  ],
  "total_results": 1,
  "page": 1,
  "limit": 10
}
```


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

## 5. Documenting Error Handling and Status Codes

Errors happen! Make sure users **know what to expect** when things go wrong. This is a crucial part of [API communication](/apidocumentation/apirequestsresponses.html).

### Example: Common API Error Responses

<div class="table-container">
  <table class="custom-table">
    <thead>
      <tr>
        <th>Status Code</th>
        <th>Category</th>
        <th>Meaning</th>
        <th>When It Occurs</th>
        <th>Developer Action</th>
      </tr>
    </thead>
    <tbody>
      <tr class="highlight-row">
        <td><span class="status-code error-4xx">400</span></td>
        <td>Client Error</td>
        <td><strong>Bad Request</strong></td>
        <td>Malformed JSON, invalid parameters</td>
        <td>Check request format and parameters</td>
      </tr>
      <tr>
        <td><span class="status-code error-4xx">401</span></td>
        <td>Client Error</td>
        <td><strong>Unauthorized</strong></td>
        <td>Missing or invalid API key</td>
        <td>Verify API key and authentication headers</td>
      </tr>
      <tr class="highlight-row">
        <td><span class="status-code error-4xx">403</span></td>
        <td>Client Error</td>
        <td><strong>Forbidden</strong></td>
        <td>Valid auth but lacks access rights</td>
        <td>Check user permissions or request access</td>
      </tr>
      <tr>
        <td><span class="status-code error-4xx">404</span></td>
        <td>Client Error</td>
        <td><strong>Not Found</strong></td>
        <td>Resource doesn't exist</td>
        <td>Verify resource ID or endpoint path</td>
      </tr>
      <tr class="highlight-row">
        <td><span class="status-code error-4xx">429</span></td>
        <td>Client Error</td>
        <td><strong>Too Many Requests</strong></td>
        <td>Rate limit exceeded</td>
        <td>Implement request throttling or request limit increase</td>
      </tr>
      <tr>
        <td><span class="status-code error-5xx">500</span></td>
        <td>Server Error</td>
        <td><strong>Internal Server Error</strong></td>
        <td>Server-side issue</td>
        <td>Contact API support with request details</td>
      </tr>
      <tr class="highlight-row">
        <td><span class="status-code error-5xx">503</span></td>
        <td>Server Error</td>
        <td><strong>Service Unavailable</strong></td>
        <td>API is temporarily unavailable</td>
        <td>Retry with exponential backoff strategy</td>
      </tr>
    </tbody>
  </table>
</div>

<style>
.table-container {
  overflow-x: auto;
  margin: 25px 0;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.custom-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  font-size: 0.95rem;
}

.custom-table th {
  background: #2c3e50;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 16px;
  text-align: left;
  border: none;
}

.custom-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #e9ecef;
  vertical-align: middle;
}

.highlight-row {
  background-color: #f8f9fa;
}

.status-code {
  display: inline-block;
  padding: 5px 8px;
  border-radius: 4px;
  font-family: monospace;
  font-weight: bold;
  color: white;
}

.error-4xx {
  background-color: #FF9800;
}

.error-5xx {
  background-color: #F44336;
}

.param-type {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
}

.string {
  background-color: #e3f2fd;
  color: #0d47a1;
}

.number {
  background-color: #fff8e1;
  color: #ff6f00;
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.bg-success {
  background-color: #4CAF50;
  color: white;
}

.bg-warning {
  background-color: #FF9800;
  color: white;
}

.bg-danger {
  background-color: #F44336;
  color: white;
}

.tight-list {
  margin: 0;
  padding-left: 20px;
}

.complexity-level {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.85rem;
}

.level-low {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.level-medium {
  background-color: #fff8e1;
  color: #ff8f00;
}

.level-high {
  background-color: #ffebee;
  color: #c62828;
}
</style>

### Example Error Response Documentation

```json
{
  "error": "Book not found",
  "status": 404,
  "message": "The requested book ID does not exist in our database",
  "request_id": "a1b2c3d4"
}
```

<div class="interactive-demo">
  <h4>Try it yourself: API Error Response Generator</h4>
  <div class="demo-container">
    <div class="demo-controls">
      <button id="error-400-btn" class="btn-primary">400 Bad Request</button>
      <button id="error-401-btn" class="btn-primary">401 Unauthorized</button>
      <button id="error-404-btn" class="btn-primary">404 Not Found</button>
      <button id="error-500-btn" class="btn-primary">500 Server Error</button>
    </div>
    <div class="demo-output">
      <div id="error-result">Select an error type to see a sample API error response</div>
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
  flex-wrap: wrap;
  gap: 10px;
}
.btn-primary {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  background: #4a6ef5;
  color: white;
}
.demo-output {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  padding: 10px;
  min-height: 80px;
  font-family: monospace;
  white-space: pre-wrap;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const error400Btn = document.getElementById('error-400-btn');
  const error401Btn = document.getElementById('error-401-btn');
  const error404Btn = document.getElementById('error-404-btn');
  const error500Btn = document.getElementById('error-500-btn');
  const errorResult = document.getElementById('error-result');
  
  error400Btn.addEventListener('click', function() {
    errorResult.innerHTML = JSON.stringify({
      error: "Bad Request",
      status: 400,
      message: "The request parameters are invalid",
      details: {
        field: "title",
        issue: "Must be between 1 and 100 characters"
      },
      request_id: "req_1a2b3c"
    }, null, 2);
  });
  
  error401Btn.addEventListener('click', function() {
    errorResult.innerHTML = JSON.stringify({
      error: "Unauthorized",
      status: 401,
      message: "Invalid or missing API key",
      help: "Please check your API key or obtain a new one at https://api.example.com/dashboard",
      request_id: "req_2b3c4d"
    }, null, 2);
  });
  
  error404Btn.addEventListener('click', function() {
    errorResult.innerHTML = JSON.stringify({
      error: "Not Found",
      status: 404,
      message: "The requested resource does not exist",
      resource: "/books/9999",
      request_id: "req_3c4d5e"
    }, null, 2);
  });
  
  error500Btn.addEventListener('click', function() {
    errorResult.innerHTML = JSON.stringify({
      error: "Internal Server Error",
      status: 500,
      message: "Something went wrong on our end",
      trace_id: "trace_4d5e6f",
      request_id: "req_5e6f7g"
    }, null, 2);
  });
});
</script>

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


## 6. Adding Code Examples for Developers

Developers love working code examples. Include them for multiple programming languages if possible.

### Example: Calling the API with Python

```python
import requests

url = "https://api.example.com/books?title=harry%20potter"
headers = {"Authorization": "Bearer YOUR_API_KEY"}

response = requests.get(url, headers=headers)
print(response.json())
```

### Example: Calling the API with JavaScript

```js
fetch("https://api.example.com/books?title=harry%20potter", {
  method: "GET",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY"
  }
})
.then(response => response.json())
.then(data => console.log(data));
```


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

  
## 7. Best Practices for Writing Developer-Friendly API Documentation

Here are some **quick tips** to make your documentation shine:

- **Keep it simple.** Don't over complicate explanations.
- **Be consistent.** Use the same format for every endpoint.
- **Use real examples.** Show requests and responses with actual data.
- **Provide code snippets.** Help developers integrate the API faster.
- **Keep it updated.** API changes? Update the docs!
- **Include authentication examples.** Show the complete flow.
- **Document rate limits.** Help developers avoid throttling issues.
- **Provide SDK links.** If you offer libraries, link to them.
- **Include versioning information.** Make it clear which version you're documenting.


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
  

## 8. Tools for Creating API Documentation

Several tools can help you create beautiful, interactive API documentation:

<div class="table-container">
  <table class="custom-table">
    <thead>
      <tr>
        <th>Tool</th>
        <th>Type</th>
        <th>Best Features</th>
        <th>Best For</th>
        <th>Learning Curve</th>
      </tr>
    </thead>
    <tbody>
      <tr class="highlight-row">
        <td>
          <a href="https://swagger.io/" target="_blank">
            <strong>Swagger/OpenAPI</strong>
          </a>
        </td>
        <td>Specification</td>
        <td>
          <ul class="tight-list">
            <li>Industry standard</li>
            <li>Interactive UI</li>
            <li>Code generation</li>
          </ul>
        </td>
        <td>REST APIs</td>
        <td>
          <span class="complexity-level level-medium">Medium</span>
        </td>
      </tr>
      <tr>
        <td>
          <a href="https://www.postman.com/" target="_blank">
            <strong>Postman</strong>
          </a>
        </td>
        <td>Platform</td>
        <td>
          <ul class="tight-list">
            <li>Testing + Documentation</li>
            <li>Team collaboration</li>
            <li>API collections</li>
          </ul>
        </td>
        <td>API testing teams</td>
        <td>
          <span class="complexity-level level-low">Low</span>
        </td>
      </tr>
      <tr class="highlight-row">
        <td>
          <a href="https://redocly.github.io/redoc/" target="_blank">
            <strong>Redoc</strong>
          </a>
        </td>
        <td>Generator</td>
        <td>
          <ul class="tight-list">
            <li>Beautiful documentation</li>
            <li>Responsive design</li>
            <li>Search function</li>
          </ul>
        </td>
        <td>Static documentation</td>
        <td>
          <span class="complexity-level level-low">Low</span>
        </td>
      </tr>
      <tr>
        <td>
          <a href="https://github.com/slatedocs/slate" target="_blank">
            <strong>Slate</strong>
          </a>
        </td>
        <td>Template</td>
        <td>
          <ul class="tight-list">
            <li>Markdown-based</li>
            <li>Multi-language support</li>
            <li>GitHub Pages compatible</li>
          </ul>
        </td>
        <td>GitHub-hosted docs</td>
        <td>
          <span class="complexity-level level-medium">Medium</span>
        </td>
      </tr>
    </tbody>
  </table>
</div>

{% include faq-section.html 
  title="Frequently Asked Questions About API Documentation"
  description="Get answers to common questions about writing effective API documentation, including structure, examples, and best practices."
  data_file="api_writing_faqs"
%}

{% include key_takeaways.html content="
<ul>
  <li>Structure API docs systematically with introduction, authentication, endpoints, and examples</li>
  <li>Document authentication methods clearly with practical examples</li>
  <li>Provide detailed endpoint documentation including all parameters and response formats</li>
  <li>Include comprehensive error handling information with status codes and example responses</li>
  <li>Add real code examples in multiple programming languages</li>
  <li>Follow documentation best practices for consistency, clarity, and completeness</li>
  <li>Consider using specialized tools like Swagger/OpenAPI for better documentation</li>
</ul>
" %}

Great job! You now know **how to structure and write API documentation** that is clear, concise, and developer-friendly.

In the subsequent chapters, we will practice documenting **APIs ([REST](/apidocumentation/restAPI.html), [Webhooks](/webhook.html), and OAuth)** and applying what we've learned.

{% include quiz.html
  title="Test Your Knowledge"
  description="Check your understanding of API documentation best practices with this quiz."
  quizDataFile="writingapi_questions"
  theme="blue"
  animate=true
%}


<div class="author-cta">
  <img src="{{ site.baseurl }}/assets/images/gaurav.svg" alt="API Documentation Expert" class="author-image">
  <div class="author-message">
    <h4>Was this guide helpful?</h4>
    <p>If you found this guide on writing effective API documentation valuable, please share it with your development team or on social media. Your feedback helps us improve our content!</p>
    <div class="social-share">
      <a href="https://twitter.com/intent/tweet?url={{ site.url }}{{ page.url }}&text=Learn how to write effective API documentation that developers love" class="share-button twitter">Share on Twitter</a>
      <a href="https://www.linkedin.com/shareArticle?mini=true&url={{ site.url }}{{ page.url }}&title=Writing Effective API Documentation" class="share-button linkedin">Share on LinkedIn</a>
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
  title="API Documentation Resources"
  description="Expand your knowledge of API documentation with these resources."
  external_links="OpenAPI Specification,https://spec.openapis.org/oas/latest.html|Swagger Documentation,https://swagger.io/docs/|API Documentation Best Practices,https://developers.google.com/style/api-reference-comments|Write the Docs - API Documentation Guide,https://www.writethedocs.org/guide/api/definition/"
  tools="Swagger Editor,https://editor.swagger.io/|Postman API Documentation,https://www.postman.com/api-documentation-tool/|Redoc Documentation Generator,https://redocly.github.io/redoc/|Stoplight API Design Platform,https://stoplight.io/"
%}


