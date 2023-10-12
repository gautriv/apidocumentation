---
title: Anatomy of URL part 2
keywords: [API documentation, API information gathering, API documentation best practices, API documentation tools, API documentation planning, API documentation structure, API documentation writing, API documentation testing, API documentation review, API documentation publishing, API documentation maintenance, API documentation improvement, Writing API documentation, Understanding API, Identifying target audience, Documentation goals, Gathering API information, Organizing documentation structure, Writing clear content, Including code samples, Testing API documentation, Seeking feedback on documentation, Publishing API documentation, Maintaining API documentation, Continuous improvement in documentation, Technical writing for APIs, API documentation platforms, Effective API documentation, User-friendly API documentation, URLs, API documentation, web addresses, web resources, protocols, domains, paths, query parameters, endpoints, developers, marketers, troubleshoot API issues, track website performance, API development, web development, resources access, API understanding, API usage, API resources, API endpoints, API troubleshoot, API performance tracking, API mastery]
sidebar: sidebar
permalink: /anatomyofurltwo.html
folder: mydoc
completed: 14
next:
  url: https://beingtechnicalwriter.com/
previous:
  url: https://beingtechnicalwriter.com/apidocumentation/anatomyofurl.html
---

You now know about the components of a URL: protocol, domain, path, query parameters, and fragment identifiers. But that's not all! URLs also have endpoints and resources. In this chapter, you'll learn about endpoints and resources and how they differ from paths.

Let's start with an example URL: `https://api.example.com/users/12345?name=John Doe`

The above URL has following components, and we document all of them if present:

* Endpoint: `https://api.example.com/users/12345?name=John Doe`
* Resource: `/12345?name=John Doe`

Let's see everything in detail. Select the appropriate tabs for more information. For example, if you want all the relevant information on domain name, select the **Endpoint** tab.

<div class="tabs">
    <button class="tablink" onclick="openTab('endpoint')">Endpoint</button>
    <button class="tablink" onclick="openTab('resource')">Resource</button>
</div>

<div id="endpoint" class="tabcontent">
    <h2>Endpoint</h2>
    <p>An endpoint is a complete URL that can be used to access a resource. It includes the protocol (for example, HTTP or HTTPS), domain name, path, and query parameters (if any). The HTTP method is also typically included in the endpoint.</p>

    <p>In our URL, the endpoint is: <code>https://api.example.com/users/12345?name=John Doe</code>.</p>

    <p>This endpoint can be used to retrieve the user with the ID 12345 from the API exposed by api.example.com.</p>

    <h3>How to Identify an Endpoint?</h3>

    <p>To identify an endpoint, look for the following components in the URL:</p>

    <ul>
        <li>Protocol (for example, HTTP or HTTPS)</li>
        <li>Domain name</li>
        <li>Path</li>
        <li>Query parameter (if any)</li>
    </ul>

    <p>For example, in the following URL, the endpoint is: <code>https://api.example.com/users/12345</code>:</p>
    <pre><code>HTTP GET /users/12345</code></pre>

<div class="question-box">
    <i class="fas fa-question"></i> Questions to ask yourself about endpoints:
    <ul>
        <li>What is the purpose of the endpoint in this API?</li>
        <li>What is the full URL of the endpoint, including the protocol, domain, path, and query parameters?</li>
        <li>What HTTP methods can be used with this endpoint (for example, GET, POST, PUT, DELETE)?</li>
        <li>What type of data does this endpoint return (for example, JSON, XML)?</li>
        <li>Are there any specific security considerations for this endpoint (for example, authentication or authorization requirements)?</li>
        <li>Is the endpoint documented, and if so, where can you find the documentation?</li>
    </ul>
</div>
</div>

<div id="resource" class="tabcontent">
    <h2>Resource</h2>
    <p>A resource is a data object or entity that is exposed by an API. It can be anything from a single user to a complex product catalog. Resources are typically represented as JSON or XML objects in API responses.</p>
    <p>For example, the following JSON object could represent a user resource:</p>
    <pre><code>
{
  "id": 12345,
  "name": "John Doe",
  "email": "john.doe@example.com"
}
</code></pre>

    <p>Resources can be accessed through endpoints. For example, the following endpoint could be used to retrieve the user with the ID 12345:</p>

    <pre><code>HTTP GET /users/12345</code></pre>

    <p>Resources can also be created, updated, and deleted through endpoints. For example, the following endpoint could be used to create a new user:</p>

    <pre><code>HTTP POST /users</code></pre>

    <h3>How to Identify a Resource?</h3>

    <p>To identify a resource, look for the following in the URL:</p>

    <ul>
      <li>Path</li>
      <li>Query parameters (if any)</li>
    </ul>

    <p>For example, in the following URL, the resource is the user with <code>ID 12345</code>:</p>
    <pre><code>https://api.example.com/users/12345</code></pre>

<div class="question-box">
    <i class="fas fa-question"></i> Questions to ask yourself about resources:
    <ul>
        <li>What is the purpose of this resource in the context of the API?</li>
        <li>What data does this resource represent (for example, user, product, order)?</li>
        <li>What is the structure and schema of this resource's data (for example, fields, attributes)?</li>
        <li>How can you uniquely identify this resource (for example, ID, URL, or other key)?</li>
        <li>What operations can you perform on this resource (for example, read, create, update, delete)?</li>
        <li>Are there any relationships between this resource and other resources in the API?</li>
        <li>What are the common use cases for accessing or modifying this resource?</li>
        <li>Are there any specific access control or permissions associated with this resource?</li>
        <li>How is this resource represented in API responses (for example, JSON, XML)?</li>
    </ul>
</div>
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
  openTab("endpoint");
</script>

<script>
  // Initialize Prism.js
  Prism.highlightAll();
</script>