---
layout: chapter
title: "API Endpoints and Resources"
description: "Explore API endpoints and resources in URLs, understanding how they build upon basic URL components for effective API documentation."
module_id: "anatomy"
module_title: "Anatomy of URLs"
chapter_number: 2
permalink: /anatomyofurltwo.html
prev_chapter: "/anatomyofurl.html"
prev_title: "Anatomy of URL part 1"
module_chapters:
  - number: 1
    title: "Anatomy of URL part 1"
    url: "/anatomyofurl.html"
  - number: 2
    title: "API Endpoints and Resources"
    url: "/anatomyofurltwo.html"
resources:
  - title: "API Glossary"
    url: "#"
  - title: "Web API Design Best Practices"
    url: "#"
---

<div class="chapter-section">
  <h2 id="introduction">Advanced URL Components: Endpoints & Resources</h2>
  
  <p class="intro-text">In the previous chapter, you learned about the basic components of a URL: protocol, domain, path, query parameters, and fragment identifiers. But that's not all! URLs also have endpoints and resources. In this chapter, you'll learn about endpoints and resources and how they differ from paths.</p>
  
  <div class="url-anatomy-tabs">
    <div class="url-visual">
      <div class="highlight-area">
        <div class="url-string">
          <span class="protocol-part">https://</span><span class="domain-part">api.example.com</span><span class="path-part">/users/</span><span class="endpoint-part">12345</span><span class="query-part">?name=John%20Doe</span>
        </div>
      </div>
      <div class="url-parts">
        <div class="url-part endpoint" data-tab="endpoint">Endpoint</div>
        <div class="url-part resource" data-tab="resource">Resource</div>
      </div>
    </div>
    
    <div class="url-tabs-navigation">
      <button class="url-tab-button active" data-tab="endpoint">Endpoint</button>
      <button class="url-tab-button" data-tab="resource">Resource</button>
    </div>
  
    <div id="endpoint" class="url-tab-content active">
      <!-- Content for Endpoint tab -->
      <h2>Endpoints in API Documentation</h2>
      <p>An endpoint is a complete URL that can be used to access a resource. It includes the protocol (for example, HTTP or HTTPS), domain name, path, and query parameters (if any). The HTTP method is also typically included when documenting an endpoint.</p>

      <p>In our example URL, the endpoint is: <code>https://api.example.com/users/12345?name=John%20Doe</code>.</p>

      <p>This endpoint can be used to retrieve the user with the ID 12345 from the API exposed by api.example.com.</p>

      <h3>Endpoints vs. Basic URL Components</h3>
      <p>While a URL describes how to access a specific resource on the web, an endpoint is a more specific term used in API documentation. An endpoint combines:</p>
      
      <div class="api-method-card get">
        <h4>Endpoint Structure</h4>
        <ul>
          <li><strong>Base URL:</strong> The protocol + domain (https://api.example.com)</li>
          <li><strong>Path:</strong> The specific location of the resource (/users/12345)</li>
          <li><strong>Query parameters:</strong> Additional filtering or options (?name=John%20Doe)</li>
          <li><strong>HTTP method:</strong> The operation to perform (GET, POST, PUT, DELETE, etc.)</li>
        </ul>
      </div>

      <h3>Endpoint Patterns</h3>
      <p>Endpoints typically follow consistent patterns within an API. Common patterns include:</p>
      
      <div class="endpoint-pattern-table">
        <table>
          <thead>
            <tr>
              <th>Operation</th>
              <th>HTTP Method</th>
              <th>Endpoint Pattern</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>List all resources</td>
              <td>GET</td>
              <td>/resources</td>
              <td>GET /users</td>
            </tr>
            <tr>
              <td>Get a specific resource</td>
              <td>GET</td>
              <td>/resources/{id}</td>
              <td>GET /users/12345</td>
            </tr>
            <tr>
              <td>Create a resource</td>
              <td>POST</td>
              <td>/resources</td>
              <td>POST /users</td>
            </tr>
            <tr>
              <td>Update a resource</td>
              <td>PUT/PATCH</td>
              <td>/resources/{id}</td>
              <td>PUT /users/12345</td>
            </tr>
            <tr>
              <td>Delete a resource</td>
              <td>DELETE</td>
              <td>/resources/{id}</td>
              <td>DELETE /users/12345</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>How to Identify an Endpoint</h3>

      <p>To identify an endpoint in API documentation, look for:</p>

      <ul>
        <li>A complete URL including the protocol, domain, and path</li>
        <li>An associated HTTP method (GET, POST, PUT, DELETE, etc.)</li>
        <li>Parameters that can be included (path parameters, query parameters)</li>
        <li>Expected request and response formats</li>
      </ul>

      <p>For example, in API documentation, you might see something like:</p>
      <pre><code>GET /users/{userId}
Content-Type: application/json
Authorization: Bearer {token}</code></pre>

      <h3>Documenting Endpoints</h3>
      <p>When documenting endpoints, technical writers typically include:</p>
      <ul>
        <li>The HTTP method and URL path</li>
        <li>A description of what the endpoint does</li>
        <li>Required and optional parameters</li>
        <li>Example requests and responses</li>
        <li>Authentication requirements</li>
        <li>Possible error responses</li>
      </ul>

      <div class="question-box">
        <div class="question-box-header">
          <div class="icon"><i class="fas fa-lightbulb"></i></div>
          <button class="question-toggle">
            <span>Questions to Explore on API Endpoints</span>
            <span class="toggle-icon">↓</span>
          </button>
        </div>
        <div class="question-box-content">
          <ul class="questions-list">
            <li class="question-item">What is the purpose of the endpoint in this API?</li>
            <li class="question-item">What is the full URL of the endpoint, including the protocol, domain, path, and query parameters?</li>
            <li class="question-item">What HTTP methods can be used with this endpoint (for example, GET, POST, PUT, DELETE)?</li>
            <li class="question-item">What type of data does this endpoint return (for example, JSON, XML)?</li>
            <li class="question-item">Are there any specific security considerations for this endpoint (for example, authentication or authorization requirements)?</li>
            <li class="question-item">Is the endpoint documented, and if so, where can you find the documentation?</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div id="resource" class="url-tab-content">
      <!-- Content for Resource tab -->
      <h2>Resources in API Documentation</h2>
      <p>A resource is a data object or entity that is exposed by an API. Resources are the nouns of the API - they represent the data entities that users can interact with through the API endpoints.</p>
      
      <p>In our example URL, <code>https://api.example.com/users/12345?name=John%20Doe</code>, the resource is the user with ID 12345.</p>

      <h3>Resource Representations</h3>
      <p>Resources are typically represented as structured data in API responses. The most common formats are:</p>
      
      <div class="code-tabs">
        <div class="code-tab-buttons">
          <button class="code-tab-button active" data-format="json">JSON</button>
          <button class="code-tab-button" data-format="xml">XML</button>
        </div>
        
        <div class="code-content json active">
          <pre><code>{
  "id": 12345,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "created_at": "2023-05-12T14:32:17Z",
  "status": "active",
  "role": "user"
}</code></pre>
        </div>
        
        <div class="code-content xml">
          <pre><code>&lt;user&gt;
  &lt;id&gt;12345&lt;/id&gt;
  &lt;name&gt;John Doe&lt;/name&gt;
  &lt;email&gt;john.doe@example.com&lt;/email&gt;
  &lt;created_at&gt;2023-05-12T14:32:17Z&lt;/created_at&gt;
  &lt;status&gt;active&lt;/status&gt;
  &lt;role&gt;user&lt;/role&gt;
&lt;/user&gt;</code></pre>
        </div>
      </div>

      <h3>Resource Collections</h3>
      <p>APIs often return collections of resources. For example, a request to <code>GET /users</code> might return a collection of user resources:</p>
      
      <pre><code>{
  "users": [
    {
      "id": 12345,
      "name": "John Doe",
      "email": "john.doe@example.com"
    },
    {
      "id": 12346,
      "name": "Jane Smith",
      "email": "jane.smith@example.com"
    }
  ],
  "total": 2,
  "page": 1,
  "per_page": 10
}</code></pre>

      <h3>Resource Hierarchy</h3>
      <p>Resources often have relationships with other resources, creating a hierarchy. These relationships are typically represented in the URL path:</p>
      
      <div class="hierarchy-container">
        <div class="hierarchy-item">
          <code>/users</code>
          <div class="hierarchy-children">
            <div class="hierarchy-item">
              <code>/users/{userId}</code>
              <div class="hierarchy-children">
                <div class="hierarchy-item">
                  <code>/users/{userId}/orders</code>
                  <div class="hierarchy-children">
                    <div class="hierarchy-item">
                      <code>/users/{userId}/orders/{orderId}</code>
                    </div>
                  </div>
                </div>
                <div class="hierarchy-item">
                  <code>/users/{userId}/addresses</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3>CRUD Operations on Resources</h3>
      <p>Resources can be manipulated through CRUD operations (Create, Read, Update, Delete):</p>
      
      <div class="crud-operations">
        <div class="crud-operation create">
          <h4>Create</h4>
          <p><code>POST /resources</code></p>
          <p>Creates a new resource instance</p>
        </div>
        <div class="crud-operation read">
          <h4>Read</h4>
          <p><code>GET /resources/{id}</code></p>
          <p>Retrieves a specific resource</p>
        </div>
        <div class="crud-operation update">
          <h4>Update</h4>
          <p><code>PUT/PATCH /resources/{id}</code></p>
          <p>Updates an existing resource</p>
        </div>
        <div class="crud-operation delete">
          <h4>Delete</h4>
          <p><code>DELETE /resources/{id}</code></p>
          <p>Removes a resource</p>
        </div>
      </div>

      <h3>How to Identify a Resource in a URL</h3>

      <p>To identify a resource in a URL, look for:</p>

      <ul>
        <li>Nouns in the path (e.g., <code>/users</code>, <code>/products</code>)</li>
        <li>Identifiers that specify a particular resource instance (e.g., <code>/users/12345</code>)</li>
        <li>Hierarchical relationships (e.g., <code>/users/12345/orders</code>)</li>
      </ul>

      <h3>Best Practices for Documenting Resources</h3>
      <p>When documenting resources, technical writers typically include:</p>
      <ul>
        <li>A clear description of what the resource represents</li>
        <li>The resource's properties and their data types</li>
        <li>Required vs. optional properties</li>
        <li>Relationships with other resources</li>
        <li>Example representations</li>
        <li>Available operations on the resource</li>
      </ul>

      <div class="question-box">
        <div class="question-box-header">
          <div class="icon"><i class="fas fa-lightbulb"></i></div>
          <button class="question-toggle">
            <span>Questions to Explore on API Resources</span>
            <span class="toggle-icon">↓</span>
          </button>
        </div>
        <div class="question-box-content">
          <ul class="questions-list">
            <li class="question-item">What is the purpose of this resource in the context of the API?</li>
            <li class="question-item">What data does this resource represent (for example, user, product, order)?</li>
            <li class="question-item">What is the structure and schema of this resource's data (for example, fields, attributes)?</li>
            <li class="question-item">How can you uniquely identify this resource (for example, ID, URL, or other key)?</li>
            <li class="question-item">What operations can you perform on this resource (for example, read, create, update, delete)?</li>
            <li class="question-item">Are there any relationships between this resource and other resources in the API?</li>
            <li class="question-item">What are the common use cases for accessing or modifying this resource?</li>
            <li class="question-item">Are there any specific access control or permissions associated with this resource?</li>
            <li class="question-item">How is this resource represented in API responses (for example, JSON, XML)?</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

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

  <h3>Differences Between Paths, Endpoints, and Resources</h3>
  
  <div class="comparison-table">
    <table>
      <thead>
        <tr>
          <th>Concept</th>
          <th>Definition</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Path</strong></td>
          <td>A component of a URL that specifies the location of a resource on the server</td>
          <td><code>/users/12345</code></td>
        </tr>
        <tr>
          <td><strong>Endpoint</strong></td>
          <td>A complete URL plus HTTP method that can be used to access a resource</td>
          <td><code>GET https://api.example.com/users/12345</code></td>
        </tr>
        <tr>
          <td><strong>Resource</strong></td>
          <td>The data entity or object being accessed or manipulated</td>
          <td>The user with ID 12345 and its associated data</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="chapter-section">
  <h2 id="chapter-summary">Chapter Summary</h2>
  
  <div class="chapter-takeaways">
    <h3 class="chapter-takeaways-header">Key Takeaways</h3>
    <div class="chapter-takeaways-content">
      <ul class="chapter-takeaways-list">
        <li>An API endpoint is a complete URL plus an HTTP method used to access or manipulate a resource</li>
        <li>Resources are data entities or objects exposed by an API (users, products, orders, etc.)</li>
        <li>Resources typically follow RESTful naming conventions with plural nouns (e.g., /users)</li>
        <li>Resources can be organized hierarchically to represent relationships (/users/{id}/orders)</li>
        <li>Most APIs perform CRUD operations (Create, Read, Update, Delete) on resources</li>
        <li>Resources are typically represented as JSON or XML in API responses</li>
        <li>Understanding the difference between paths, endpoints, and resources is crucial for API documentation</li>
        <li>Technical writers must document endpoints comprehensively, including methods, parameters, and examples</li>
      </ul>
    </div>
  </div>
</div>

<script>
  document.addEventListener("DOMContentLoaded", function () {
  // Tab functionality for URL anatomy
  const tabButtons = document.querySelectorAll('.url-tab-button');
  const tabContents = document.querySelectorAll('.url-tab-content');
  const urlParts = document.querySelectorAll('.url-part');
  const urlSpans = document.querySelectorAll('.url-string span');

  function activateTab(tabName) {
    tabContents.forEach(content => content.classList.toggle('active', content.id === tabName));
    tabButtons.forEach(button => button.classList.toggle('active', button.getAttribute('data-tab') === tabName));
    urlSpans.forEach(span => span.classList.remove('highlight'));

    if (tabName === 'endpoint') {
      document.querySelector('.path-part')?.classList.add('highlight');
      document.querySelector('.endpoint-part')?.classList.add('highlight');
      document.querySelector('.query-part')?.classList.add('highlight');
    } else if (tabName === 'resource') {
      document.querySelector('.endpoint-part')?.classList.add('highlight');
    }
  }

  tabButtons.forEach(button => button.addEventListener('click', () => activateTab(button.getAttribute('data-tab'))));
  urlParts.forEach(part => part.addEventListener('click', () => activateTab(part.getAttribute('data-tab'))));

  // Code format tabs
  document.querySelectorAll('.code-tab-button').forEach(button => {
    button.addEventListener('click', function () {
      const format = this.getAttribute('data-format');

      document.querySelectorAll('.code-content').forEach(content => content.classList.toggle('active', content.classList.contains(format)));
      document.querySelectorAll('.code-tab-button').forEach(btn => btn.classList.toggle('active', btn === this));
    });
  });

  // Question box toggle functionality
  document.querySelectorAll('.question-toggle').forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      this.closest('.question-box')?.classList.toggle('active');
    });
  });

  // Activate Endpoint tab by default
  activateTab('endpoint');
});

</script>
