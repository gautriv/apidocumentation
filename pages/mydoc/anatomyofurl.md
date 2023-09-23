---
title: Anatomy of URL
keywords: [API documentation, API information gathering, API documentation best practices, API documentation tools, API documentation planning, API documentation structure, API documentation writing, API documentation testing, API documentation review, API documentation publishing, API documentation maintenance, API documentation improvement, Writing API documentation, API documentation best practices, Understanding API, Identifying target audience
Documentation goals, Gathering API information, Organizing documentation structure, Writing clear content, Including code samples, Testing API documentation, Seeking feedback on documentation, Publishing API documentation, Maintaining API documentation, Continuous improvement in documentation
Technical writing for APIs, API documentation platforms, Effective API documentation, User-friendly API documentation]
sidebar: sidebar
permalink: /anatomyofurl.html
folder: mydoc
completed: 12
next:
  url: https://beingtechnicalwriter.com/apidocumentation/anatomyofurl.html
previous:
  url: https://beingtechnicalwriter.com/apidocumentation/restAPI.html
---

In the previous chapter, you learned about the main components of a REST API. I promised to dive deeper into the terms and definitions so that you have a clear understanding of them. So here we go.

Let's start with an example URL: `https://www.google.com/search?q=cats#my-fragment`

The above URL has following components, and we document all of them if present:

* Protocol: `https://`
* Domain name: `www.google.com`
* Path: `/search`
* Query parameters: `q=cats`
* Fragment identifier: `my-fragments`

Let's see everything in detail. Select the appropriate tabs for more information. For example, if you want all the relevant information on domain name, select the **Domain Name** tab.

<div class="tabs">
  <button class="tablink" onclick="openTab('protocol')">Protocol</button>
  <button class="tablink" onclick="openTab('domain')">Domain Name</button>
  <button class="tablink" onclick="openTab('path')">Path</button>
  <button class="tablink" onclick="openTab('query')">Query Parameters</button>
  <button class="tablink" onclick="openTab('fragment')">Fragment Identifiers</button>
</div>

<div id="protocol" class="tabcontent">
  <!-- Content for Protocol tab -->
<h2> Protocol </h2>
<p>In our URL the protocol is <code>https://</code>. The World Wide Web, the cornerstone of modern information exchange and communication, operates on a structured protocol known as HTTP, or Hypertext Transfer Protocol. At its core, HTTP is the language that web browsers and servers use to converse with each other, enabling the seamless retrieval and delivery of web content. While most of us interact with the web daily, the inner workings of HTTP methods and their significance remain a mystery to many.</p>

<p>In this chapter, we'll discuss the essential components of HTTP, with a primary focus on the pivotal role played by HTTP methods. Understanding these methods is not only crucial for web developers and programmers but also for technical writers looking to comprehend how data flows across the internet.</p>

<h2>The Common HTTP Methods</h2>
<p>HTTP methods, often referred to as HTTP verbs, are fundamental to the functioning of the World Wide Web. They define the actions that can be performed on resources, allowing clients (such as web browsers or applications) to communicate with servers in a structured manner. These methods are so crucial that they are often collectively referred to as CRUD operations, representing Create, Read, Update, and Delete actions on resources. In this section, we'll delve into the five primary HTTP methods: GET, POST, PUT, PATCH, and DELETE, each serving a specific purpose in web development and API design.</p>

<h3>1. GET method</h3>
<ul>
  <li><strong>Request:</strong> A GET request is used to retrieve data from the server. It typically doesn't have a request body, as it's meant for read-only operations. Any data needed for the request is usually sent as query parameters in the URL.</li>
  Example request:
  <pre><code>GET /api/users?age=30</code></pre>
  <li><strong>Response:</strong> The response to a GET request contains the requested data. It may have a response body, such as JSON or HTML, depending on the resource being fetched.</li>
  Example response:
  <pre><code>200 OK
{
  "name": "John Doe",
  "age": 30
}</code></pre>
</ul>

<h3>2. POST method</h3>
<ul>
  <li><strong>Request:</strong> A POST request is used to create a new resource on the server. It typically has a request body that contains data for the new resource.</li>
  Example request:
  <pre><code>POST /api/users
Request Body:
{
  "name": "John Doe",
  "age": 30
}</code></pre>
  <li><strong>Response:</strong> The response to a POST request often includes information about the newly created resource. It may have a response body containing the ID or other details of the created resource.</li>
  Example response:
  <pre><code>201 Created
{
  "id": 123,
  "message": "User created successfully"
}</code></pre>
</ul>

<h3>3. PUT method</h3>
<ul>
  <li><strong>Request:</strong> A PUT request is used to update an existing resource on the server. It typically has a request body that contains the complete updated representation of the resource.</li>
  Example request:
  <pre><code>PUT /api/users/123
Request Body:
{
  "name": "Updated Name",
  "age": 31
}</code></pre>
  <li><strong>Response:</strong> The response to a PUT request often confirms the successful update and may include information about the updated resource.</li>
  Example response:
  <pre><code>200 OK
{
  "message": "User updated successfully"
}</code></pre>
</ul>

<h3>4. PATCH method</h3>
<ul>
  <li><strong>Request:</strong> A PATCH request is used to partially update an existing resource. It has a request body that contains a partial representation of the resource, indicating specific changes.</li>
  Example request:
  <pre><code>PATCH /api/users/123
Request Body:
{
  "age": 32
}</code></pre>
  <li><strong>Response:</strong> The response to a PATCH request confirms the successful partial update.</li>
  Example response:
  <pre><code>200 OK
{
  "message": "User information updated"
}</code></pre>
</ul>

<h3>5. DELETE method</h3>
<ul>
  <li><strong>Request:</strong> A DELETE request is used to request the removal of a resource from the server. It typically doesn't have a request body, as it's focused on resource deletion based on the URL.</li>
  Example request:
  <pre><code>DELETE /api/users/123</code></pre>

  <li><strong>Response:</strong> The response to a DELETE request confirms the successful deletion.</li>
  Example response:
  <pre><code>204 No Content</code></pre>
</ul>

<b><p>In summary:</p></b>
<ul>
<li>HTTP methods that can have a request body: POST, PUT, PATCH</li>
<li>HTTP methods that typically don't have a request body: GET, DELETE</li>
<li>HTTP methods that can have a response body: GET, POST, PUT, PATCH</li>
<li>HTTP methods that typically don't have a response body: DELETE</li>
</ul>

<p>The specific details of request and response bodies may vary depending on the API and its design, but these examples provide a general understanding of how these HTTP methods are used.</p>

</div>

<div id="domain" class="tabcontent">
  <!-- Content for Domain Name tab -->
  Your Domain Name content goes here.
</div>

<div id="path" class="tabcontent">
  <!-- Content for Path tab -->
  Your Path content goes here.
</div>

<div id="query" class="tabcontent">
  <!-- Content for Query Parameters tab -->
  Your Query Parameters content goes here.
</div>

<div id="fragment" class="tabcontent">
  <!-- Content for Fragment Identifiers tab -->
  Your Fragment Identifiers content goes here.
</div>

<script>
  function openTab(tabName) {
    var tabs = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].style.display = "none";
      tabs[i].classList.remove("fadeIn");
    }

    var tabContent = document.getElementById(tabName);
    tabContent.style.display = "block";
    tabContent.classList.add("fadeIn");
  }

  // Show the Protocol tab by default
  openTab("protocol");
</script>

<script>
  // Initialize Prism.js
  Prism.highlightAll();
</script>