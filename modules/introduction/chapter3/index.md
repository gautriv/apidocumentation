---
layout: chapter
title: "What do Technical Writers Document in an API?"
description: "Learn about the essential components that technical writers document in APIs to create comprehensive and user-friendly documentation."
module_id: "introduction"
module_title: "Introduction to API Documentation"
chapter_number: 3
permalink: /whatwritersdo.html
prev_chapter: "/whatisanAPI.html"
prev_title: "What is an API?"
next_chapter: "/howtechwritersdocument.html"
next_title: "How do Technical Writers document an API?"
module_chapters:
  - number: 1
    title: "How the internet works?"
    url: "/howinternetworks.html"
  - number: 2
    title: "What is an API?"
    url: "/whatisanAPI.html"
  - number: 3
    title: "What do Technical Writers Document in an API?"
    url: "/whatwritersdo.html"
  - number: 4
    title: "How do Technical Writers document an API?"
    url: "/howtechwritersdocument.html"
resources:
  - title: "API Documentation Templates"
    url: "#"
  - title: "Technical Writing Guidelines for APIs"
    url: "#"
---

<div class="chapter-section">
  <h2 id="tech-writer-role">The Role of Technical Writers in API Documentation</h2>
  
  <p>So, you're probably sitting there thinking, <em>"Okay, I know APIs are like menus or maps, but what exactly does a technical writer do with them? Do we just stare at code all day and hope inspiration strikes?"</em></p>
  
  <p>Not quite! Let me guide you through this chapter, where we'll uncover the role of technical writers in the API world. If you're feeling a little lost in the terminology, don't worry—that's why we're here. By the end of this, you'll know exactly what technical writers document and why they're the unsung heroes of the developer world.</p>
  
  <h3>APIs Are Like New Cities</h3>
  
  <p>Picture this: You've just landed in a brand-new city. You're excited to explore, but you have no idea where the best coffee shops are, which streets to avoid, or how to navigate the subway system. Wandering around aimlessly might sound adventurous, but let's be real—you'd much rather have a map, a guidebook, or even a friendly local to point you in the right direction.</p>
  
  <p>Now, imagine an API as that new city. It's full of possibilities, but without clear directions, it's easy to get lost. That's where we, the technical writers, step in. We create the "guidebook" for APIs, making sure developers know exactly how to get from point A to point B without a detour to frustration-ville.</p>
  
  <div class="ad-container">
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
  </div>
</div>

<div class="chapter-section">
  <h2 id="reference-document">The Reference API Document: Your Developer's Guidebook</h2>
  
  <p>Let's say your project team just created a shiny new endpoint (more on that in a second) and they turn to you, the technical writer, saying, "We need documentation!" Here's what they really mean: "Please make sense of this technical stuff so developers don't bombard us with questions."</p>
  
  <p>So, what exactly goes into this guidebook? Let's break it down:</p>
  
  <h3>1. Endpoints: The API's Address Book</h3>
  
  <p>Endpoints are the URLs developers use to interact with the API. Think of them as addresses on a map. Each endpoint leads to a specific resource or action. For example:</p>
  <ul>
    <li><strong>GET</strong> <code>/users</code>: Fetch a list of users.</li>
    <li><strong>POST</strong> <code>/users</code>: Create a new user.</li>
  </ul>
  
  <p>Endpoints tell developers, "Here's where you can find what you're looking for."</p>
  
  <h3>2. Methods: The Actions You Can Take</h3>
  
  <p>Methods are like verbs—they define what you can do with an endpoint. The most common ones are:</p>
  <ul>
    <li><strong>GET</strong>: Retrieve data.</li>
    <li><strong>POST</strong>: Add new data.</li>
    <li><strong>PUT</strong>: Update existing data.</li>
    <li><strong>DELETE</strong>: Remove data.</li>
  </ul>
  
  <p>Think of these as the API's rules of engagement. Each endpoint may allow one or more methods.</p>
</div>

<div class="chapter-section">
  <h2 id="api-components">Essential Components in API Documentation</h2>
  
  <h3>3. Parameters: The Special Requests</h3>
  
  <p>Parameters are like specific instructions you give to the waiter. For instance, "I'll have the pizza, but hold the olives." In API terms, these are the values passed in a request, such as:</p>
  <ul>
    <li><strong>Query parameters</strong>: <code>?userID=123</code> (specifies which user's data you want).</li>
    <li><strong>Path parameters</strong>: <code>/users/{userID}</code> (the <code>{userID}</code> is dynamic and changes based on your request).</li>
  </ul>
  
  <h3>4. Requests and Their Bodies: The Ask</h3>
  
  <p>When a program interacts with an API, it sends a request. Sometimes, this request includes a "body," which is just a fancy way of saying "extra details." For example:</p>
  
  <div class="code-example">
    <pre><code class="language-json">{
  "name": "Jane Doe",
  "email": "jane.doe@example.com"
}</code></pre>
  </div>
  
  <p>This is what the API reads to figure out what you want.</p>
  
  <h3>5. Responses and Their Bodies: The Reply</h3>
  
  <p>After the request, the API responds. The response includes the requested data (if all goes well) or an error message (if something breaks). For example:</p>
  
  <div class="code-example">
    <pre><code class="language-json">{
  "status": "success",
  "data": {
    "userID": 123,
    "name": "Jane Doe"
  }
}</code></pre>
  </div>
</div>

<div class="chapter-section">
  <h2 id="examples-errors">Examples and Error Handling</h2>
  
  <h3>6. Examples: The Show-and-Tell</h3>
  
  <p>Developers love examples. They're like cheat codes for APIs. You provide sample requests and responses so developers can hit the ground running. For instance:</p>
  
  <ul>
    <li>Request: <code>GET /users/123</code></li>
    <li>Response:</li>
  </ul>
  
  <div class="code-example">
    <pre><code class="language-json">{
  "id": 123,
  "name": "Jane Doe"
}</code></pre>
  </div>
  
  <h3>7. Error Messages: The Bad News</h3>
  
  <p>No one likes errors, but they're inevitable. Your job is to document the possible error messages and what they mean. For example:</p>
  
  <ul>
    <li>Error 400: Bad Request (you messed up the request).</li>
    <li>Error 401: Unauthorized (you forgot your API key).</li>
    <li>Error 500: Internal Server Error (the API messed up).</li>
  </ul>
  
  <p>Bonus points if you include troubleshooting tips for each error!</p>
</div>

<div class="chapter-section">
  <h2 id="security-limits">Security and Limitations</h2>
  
  <h3>8. Authentication: The Bouncer at the Club</h3>
  
  <p>Before a developer can access an API, they often need to prove they're allowed in. This is called authentication, and it usually involves:</p>
  
  <ul>
    <li>API keys</li>
    <li>OAuth tokens</li>
    <li>Usernames and passwords</li>
  </ul>
  
  <p>Think of this as the API saying, "No entry without ID!"</p>
  
  <h3>9. Rate Limits: The Speed Bumps</h3>
  
  <p>Rate limits are restrictions on how many requests a developer can make in a given time. For example, "You can only send 100 requests per minute." It's like a speed limit for APIs, ensuring no one abuses the system.</p>
  
  <div class="info-box">
    <h4>Additional Documentation Components</h4>
    <p>Technical writers also document other aspects of APIs, such as:</p>
    <ul>
      <li>The required permissions for each method</li>
      <li>The expected format of the data that is passed to and returned by the API</li>
      <li>The best practices for using the API</li>
      <li>The limitations of the API</li>
      <li>The overall architecture and security features</li>
    </ul>
  </div>
</div>

<div class="chapter-section">
  <h2 id="chapter-summary">Chapter Summary</h2>
  
  <p>So, just make sure you know what we document, how we do it; it's something we will talk about later in the course. In essence, Technical Writers craft an essential guide that empowers everyone to understand, navigate, and make the most of the API world.</p>
  
  <p>Next up: How Do Technical Writers Document APIs? Get ready to uncover the tricks of the trade!</p>
  
  <div class="chapter-takeaways">
    <h3 class="chapter-takeaways-header">Key Takeaways</h3>
    <div class="chapter-takeaways-content">
      <ul class="chapter-takeaways-list">
        <li>A reference API document includes endpoints, methods, parameters, requests, responses, examples, error messages, authentication, and rate limits.</li>
        <li>As a technical writer, your job is to make APIs easy to navigate and use.</li>
      </ul>
    </div>
  </div>
</div> 