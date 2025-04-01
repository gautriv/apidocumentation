---
title: Advanced URL Anatomy in API Documentation
description: Master the advanced components of URL structure in API documentation - endpoints, resources, HTTP methods, status codes, and authentication. Learn how each element enhances API functionality and why understanding these advanced URL concepts is essential for effective API integration and documentation.
keywords: URL anatomy, advanced URL structure, API endpoints, API resources, HTTP methods, RESTful methods, GET method, POST method, PUT method, DELETE method, PATCH method, status codes, HTTP status codes, API authentication, OAuth, API keys, Bearer tokens, URL troubleshooting, API security, API access control, RESTful URL design, API URL structure, endpoint design, resource naming, API integration, API documentation best practices, secure API access, HTTP response codes, token authentication, API authorization
permalink: anatomyofurltwo.html
next_page:
  url: /dataformats.html
  title: "Understanding Data Formats"
previous_page:
  url: /anatomyofurl.html
  title: "Anatomy of a URL"
---

You now know about the components of a URL: protocol, domain, path, query parameters, and fragment identifiers. But that's not all! URLs also have endpoints and resources. In this chapter, you'll learn about endpoints and resources and how they differ from paths.

Let's start with an example URL: `https://api.example.com/users/12345?name=John Doe`

The above URL has following components, and we document all of them if present:

* **Endpoint**: `https://api.example.com/users/12345?name=John Doe`
* **Resource**: `/12345?name=John Doe`

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

    {% include question_box.html 
        title="Questions to ask yourself about endpoints:"
        icon="fas fa-question"
        questions=site.data.questions.endpoints
    %}
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

    {% include question_box.html 
        title="Questions to ask yourself about resources:"
        icon="fas fa-question"
        questions=site.data.questions.resources
    %}
</div>

<script>
  function openTab(tabName) {
    var tabs = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].style.display = "none";
      tabs[i].classList.remove("fadeIn");
    }

    var tablinks = document.getElementsByClassName("tablink");
    for (var i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active-tab");
    }

    var tabContent = document.getElementById(tabName);
    tabContent.style.display = "block";
    tabContent.classList.add("fadeIn");
    
    var selectedTab = document.querySelector('.tablink[onclick="openTab(\'' + tabName + '\')"]');
    selectedTab.classList.add("active-tab");
  }

  // Show the Protocol tab by default
  document.addEventListener('DOMContentLoaded', function() {
    openTab('endpoint');
  });
</script>

<style>
  .tabs {
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
    border-radius: 5px 5px 0 0;
    display: flex;
  }
  
  .tablink {
    background-color: inherit;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
    font-size: 17px;
    flex: 1;
    text-align: center;
  }
  
  .tablink:hover {
    background-color: #ddd;
  }
  
  .active-tab {
    background-color: #3a87ad;
    color: white;
  }
  
  .tabcontent {
    display: none;
    padding: 20px;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 5px 5px;
    animation: fadeEffect 1s;
  }
  
  @keyframes fadeEffect {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  
  .question-box {
    background-color: #f8f9fa;
    border-left: 4px solid #3a87ad;
    padding: 15px;
    margin: 20px 0;
    border-radius: 0 5px 5px 0;
  }
  
  .question-box i {
    color: #3a87ad;
    margin-right: 10px;
  }
  
  code {
    background-color: #f1f1f1;
    padding: 2px 5px;
    border-radius: 3px;
    font-family: monospace;
  }
  
  pre {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 5px;
    overflow-x: auto;
  }
</style>

## Advanced URL Concepts for API Documentation

Now that we've covered the basics of endpoints and resources, let's explore some advanced URL concepts that are crucial for creating effective, secure, and user-friendly API documentation.

### URL Encoding: Making Special Characters Safe

Have you ever noticed that spaces in URLs are replaced with `%20` or `+`? That's URL encoding in action! 

URL encoding (also called percent-encoding) converts characters that aren't allowed in URLs into a format that is. This is especially important for APIs that handle user input or special characters.

For example, the URL `https://api.example.com/search?q=John Doe` should actually be encoded as `https://api.example.com/search?q=John%20Doe`.

Here are some common URL encoding situations:
* Spaces become `%20` or `+`
* Special characters like `&`, `=`, `?`, and `/` become `%26`, `%3D`, `%3F`, and `%2F`
* Non-ASCII characters (like ñ, é, or emoji) are encoded into their UTF-8 byte values

When documenting APIs, you should:
* Show both the readable and encoded versions of URLs when they contain special characters
* Remind developers to encode values when building URL strings programmatically
* Mention which characters need special handling in your API

{% include question_box.html 
    title="Questions to ask yourself about URL encoding:"
    icon="fas fa-code"
    color="#6c567b"
    questions=site.data.questions.url_encoding
%}

### Relative vs. Absolute URLs in API Documentation

When writing API documentation, you'll need to decide whether to use absolute URLs (full URLs including the domain) or relative URLs (partial URLs that depend on a base URL).

**Absolute URLs**:
* Example: `https://api.example.com/v1/users/12345`
* Benefits: Self-contained, no ambiguity, works anywhere
* Best for: API reference documentation, examples that need to be copy-pasted

**Relative URLs**:
* Example: `/v1/users/12345` (relative to the API's base URL)
* Benefits: Shorter, easier to read, adapts to environment changes
* Best for: Documentation where the base URL is defined once and reused

A good practice is to define the base URL early in your documentation and use relative URLs for endpoints, making it clear which parts are fixed and which are variable.

### URL Design Best Practices for APIs

Well-designed URLs make APIs more intuitive and easier to use. Here are some best practices to highlight in your documentation:

1. **Be consistent with resource naming**
   * Use plural nouns for collections (`/users`, not `/user`)
   * Use consistent casing (kebab-case is common: `/user-profiles`)

2. **Create a logical hierarchy**
   * Nest resources logically: `/departments/5/employees`
   * But don't go too deep (more than 3 levels becomes unwieldy)

3. **Use query parameters appropriately**
   * For filtering: `/products?category=electronics&price=<100`
   * For pagination: `/users?page=2&limit=20`
   * For sorting: `/orders?sort=date_desc`

4. **Version your APIs in the URL**
   * `/v1/users` makes it clear which version is being used
   * Allows for evolution while maintaining backward compatibility

5. **Keep URLs readable**
   * Avoid cryptic abbreviations
   * Use descriptive resource names

When you document these practices, you help developers understand not just how to use your API, but the reasoning behind its design.

{% include question_box.html 
    title="Questions to ask yourself about URL design:"
    icon="fas fa-pencil-ruler"
    color="#2a7d8c"
    questions=site.data.questions.url_design
%}

### Security Considerations for API URLs

URLs can inadvertently expose sensitive information if not handled properly. Your documentation should address these security concerns:

1. **Never include credentials in URLs**
   * Bad: `https://api.example.com/users?api_key=abcd1234`
   * Good: Use authorization headers or request body for credentials

2. **Be cautious with sensitive identifiers**
   * Consider whether IDs in URLs could expose sensitive information
   * For highly sensitive operations, consider POST instead of GET to keep parameters out of URLs

3. **Protect against path traversal attacks**
   * Document how your API validates and sanitizes URL path components
   * Explain any restrictions on characters or patterns in URL paths

4. **HTTPS everywhere**
   * Emphasize that all API URLs should use HTTPS, never HTTP
   * Explain the risks of sending unencrypted API requests

5. **URL length limitations**
   * Document any restrictions on URL length
   * Suggest alternatives (like POST with request body) for complex queries

By addressing these security considerations in your documentation, you help developers build more secure applications that properly protect user data.

{% include question_box.html 
    title="Questions to ask yourself about URL security:"
    icon="fas fa-shield-alt"
    color="#e63946"
    questions=site.data.questions.url_security
%}

{% include key_takeaways.html content="
<ul>
  <li>Endpoints represent complete URLs for accessing API resources</li>
  <li>Resources are data objects or entities exposed by the API</li>
  <li>URL encoding converts special characters to make them URL-safe</li>
  <li>Choose between absolute and relative URLs based on documentation needs</li>
  <li>Follow URL design best practices for intuitive, consistent API interfaces</li>
  <li>Address security considerations to prevent exposing sensitive data in URLs</li>
</ul>
" %}

{% include related_resources.html 
  title="Essential URL Resources"
  description="Expand your understanding of URL structure with these carefully selected resources."
  external_links="URL Encoding Reference,https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding|RESTful API Design Best Practices,https://restfulapi.net/resource-naming/"
  tools="URL Encoder/Decoder,https://www.urlencoder.org/|API URL Builder,https://apidog.com/"
%}