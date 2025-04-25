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
image: /assets/images/api-docs-advancedurl.svg
last_modified_at: 2023-11-05T09:00:00+00:00
author_name: Technical Writing Expert
author_description: Senior technical writer with 8+ years of experience documenting APIs and developer platforms
author_expertise: 
  - "API Documentation"
  - "Technical Writing"
  - "URL Structure"
  - "API Security"
reading_time: 12
level: Intermediate
speakable: true
speakable_selectors:
  - ".doc-content h1" 
  - ".doc-content h2"
  - ".doc-content p:first-of-type"
  - "#endpoint"
  - "#resource"
---

You now know about the components of a URL: protocol, domain, path, query parameters, and fragment identifiers. But that's not all! URLs also have endpoints and resources. In this chapter, you'll learn about endpoints and resources and how they differ from paths.

{% include trivia.html 
  type="tech" 
  icon="fa-server" 
  title="The Power of API Endpoints" 
  content="The world's largest cloud providers handle billions of API endpoint calls daily. A well-designed endpoint structure can significantly impact API performance, security, and developer adoption rate."
%}

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

## Advanced URL Concepts for API Documentation

Now that we've covered the basics of endpoints and resources, let's explore some advanced URL concepts that are crucial for creating effective, secure, and user-friendly API documentation.

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
* Benefits: Shorter, environment-agnostic, easier to maintain when base URL changes
* Best for: Documentation that establishes a base URL upfront, internal references

<div class="comparison-table">
  <h3>URL Types Comparison</h3>
  <table>
    <thead>
      <tr>
        <th>Feature</th>
        <th>Absolute URLs</th>
        <th>Relative URLs</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Includes full domain</td>
        <td><span class="check">✓</span></td>
        <td><span class="cross">✗</span></td>
      </tr>
      <tr>
        <td>Works without context</td>
        <td><span class="check">✓</span></td>
        <td><span class="cross">✗</span></td>
      </tr>
      <tr>
        <td>Environment-agnostic</td>
        <td><span class="cross">✗</span></td>
        <td><span class="check">✓</span></td>
      </tr>
      <tr>
        <td>Shorter in documentation</td>
        <td><span class="cross">✗</span></td>
        <td><span class="check">✓</span></td>
      </tr>
      <tr>
        <td>Easier maintenance when domain changes</td>
        <td><span class="cross">✗</span></td>
        <td><span class="check">✓</span></td>
      </tr>
    </tbody>
  </table>
</div>

<style>
  .comparison-table {
    margin: 25px 0;
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .comparison-table h3 {
    margin-top: 0;
    color: #3a87ad;
    border-bottom: 2px solid #eaecef;
    padding-bottom: 10px;
    margin-bottom: 15px;
  }
  
  .comparison-table table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .comparison-table th, .comparison-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #eaecef;
  }
  
  .comparison-table th {
    background-color: #f1f8ff;
    font-weight: 600;
    color: #2c3e50;
  }
  
  .comparison-table tr:last-child td {
    border-bottom: none;
  }
  
  .check {
    color: #28a745;
    font-weight: bold;
  }
  
  .cross {
    color: #dc3545;
    font-weight: bold;
  }
</style>

### Documenting Best Practices for URL Design

As technical writers, you need to clearly explain the URL design patterns adopted by your API developers. Focus on these documentation aspects:

1. **Document Resource Naming Conventions**
   * Explain if your API uses nouns for resources (e.g., `/users/123`)
   * Clarify if plural nouns are used for collections (e.g., `/products`)
   * Example: "Our API uses plural nouns to represent resource collections. Individual resources are accessed using their unique IDs."

2. **Explain Hierarchical Relationships**
   * Document how nested resources are represented (e.g., `/users/123/orders`)
   * Example: "Child resources are accessed through their parent resources as shown in this pattern: `/parent/{parentId}/child/{childId}`"

3. **Clarify Naming Conventions**
   * Document whether hyphenation, camelCase, or underscore_notation is used
   * Example: "All resource names use hyphenated-lowercase format for multi-word resources (e.g., `/shipping-addresses`)"

4. **Create Consistency Guides**
   * Create a style guide section specifically for URL patterns
   * Document exceptions to standard patterns with clear examples

Remember, your job is not to design these patterns but to explain them clearly so developers can correctly implement your API.

### Documenting Security Considerations for API URLs

Technical writers play a crucial role in communicating security practices through documentation. Here's how to effectively document security aspects of URLs:

1. **Clearly Document Security Warning Notices**
   * Prominently display warnings about sensitive data: "⚠️ Never include authentication credentials in URL parameters"
   * Use highlighted callout boxes for critical security information

2. **Document Protocol Requirements**
   * Clearly state if HTTPS is required: "All API requests must use HTTPS. HTTP requests will be rejected."
   * Explain consequences of using incorrect protocols

3. **Document Authentication Parameter Placement**
   * Explain where authentication belongs (typically headers, not URLs)
   * Provide contrasting examples of correct vs. incorrect approaches:
     * ✅ CORRECT: `Authorization: Bearer {token}` in headers
     * ❌ INCORRECT: `/api/data?token=1234abc` in URL

4. **Document ID Exposure Guidelines**
   * Explain your API's approach to resource identifiers
   * Example: "This API uses non-sequential UUIDs to prevent resource enumeration"

5. **Document Validation Requirements**
   * Explain any input validation implemented for URL parameters
   * Provide examples of valid vs. invalid parameters

The technical writer's role is to communicate these security measures clearly, helping developers use the API securely rather than implementing security themselves.

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

## Documenting Common URL Issues for End Users

<div class="common-problems">
  <h3>How to Document URL Troubleshooting for API Users</h3>
  
  <div class="problem">
    <div class="problem-header">
      <span class="problem-icon">📝</span>
      <h4>Documentation Challenge: Explaining Deeply Nested URLs</h4>
    </div>
    <div class="problem-content">
      <p><strong>What to document:</strong> Provide a visual hierarchy diagram for complex URLs like <code>/organizations/123/departments/456/teams/789/members/101112</code></p>
      <p><strong>Documentation approach:</strong> Create a table showing each path segment and its purpose, with examples of alternatives:</p>
      <ul>
        <li>Standard approach: <code>/organizations/{orgId}/departments/{deptId}/teams/{teamId}/members/{memberId}</code></li>
        <li>Alternative approach: <code>/members/{memberId}?team={teamId}</code></li>
      </ul>
    </div>
  </div>
  
  <div class="problem">
    <div class="problem-header">
      <span class="problem-icon">📝</span>
      <h4>Documentation Challenge: Clarifying Inconsistent Resource Names</h4>
    </div>
    <div class="problem-content">
      <p><strong>What to document:</strong> When your API uses varying terms like <code>/users</code>, <code>/staff</code>, and <code>/customers</code> for similar concepts</p>
      <p><strong>Documentation approach:</strong> Create a resource glossary that maps business concepts to API endpoints:</p>
      <table style="width:100%">
        <tr>
          <th>Business Concept</th>
          <th>API Endpoint</th>
          <th>When to Use</th>
        </tr>
        <tr>
          <td>System users</td>
          <td><code>/users</code></td>
          <td>For managing login accounts</td>
        </tr>
        <tr>
          <td>Staff members</td>
          <td><code>/staff</code></td>
          <td>For employee-specific operations</td>
        </tr>
      </table>
    </div>
  </div>
  
  <div class="problem">
    <div class="problem-header">
      <span class="problem-icon">📝</span>
      <h4>Documentation Challenge: Explaining Action-Based URLs</h4>
    </div>
    <div class="problem-content">
      <p><strong>What to document:</strong> How to properly use verb-based endpoints if your API includes them (like <code>/getUsers</code> or <code>/createOrder</code>)</p>
      <p><strong>Documentation approach:</strong> Create a "URL Patterns" section that explains your API's approach to actions:</p>
      <div style="background:#f5f5f5; padding:10px; border-left:4px solid #0366d6;">
        <p>This API uses two types of URL patterns:</p>
        <ul>
          <li>Resource-based endpoints: <code>GET /users</code>, <code>POST /orders</code></li>
          <li>Action-based endpoints: <code>/convertCurrency</code>, <code>/validateAddress</code></li>
        </ul>
        <p>Use resource-based endpoints when working with data objects, and action-based endpoints for stateless operations.</p>
      </div>
    </div>
  </div>
  
  <div class="problem">
    <div class="problem-header">
      <span class="problem-icon">📝</span>
      <h4>Documentation Challenge: Documenting Complex Query Parameters</h4>
    </div>
    <div class="problem-content">
      <p><strong>What to document:</strong> How to use endpoints with many parameters like <code>/search?param1=value1&param2=value2&param3=value3...</code></p>
      <p><strong>Documentation approach:</strong> Create parameter tables with example combinations:</p>
      <ul>
        <li>Use expandable sections for different use cases</li>
        <li>Provide code samples showing the most common parameter combinations</li>
        <li>Create a decision tree to help users determine which parameters they need</li>
      </ul>
      <p>Example: "For basic searches, only the <code>query</code> parameter is required. Add <code>filter</code> parameters to narrow results."</p>
    </div>
  </div>
</div>

<style>
  .common-problems {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    margin: 25px 0;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }
  
  .common-problems h3 {
    margin-top: 0;
    color: #343a40;
    border-bottom: 2px solid #dee2e6;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
  
  .problem {
    margin-bottom: 20px;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    overflow: hidden;
  }
  
  .problem-header {
    display: flex;
    align-items: center;
    background-color: #f1f8ff;
    padding: 12px 15px;
    border-bottom: 1px solid #e1e4e8;
  }
  
  .problem-icon {
    font-size: 20px;
    margin-right: 10px;
  }
  
  .problem-header h4 {
    margin: 0;
    color: #0366d6;
  }
  
  .problem-content {
    padding: 15px;
  }
  
  .problem-content p {
    margin: 8px 0;
  }
  
  .problem-content code {
    background-color: #f6f8fa;
    padding: 2px 5px;
    border-radius: 3px;
    font-family: monospace;
    font-size: 0.9em;
    color: #24292e;
  }
</style>

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

## Documentation Best Practices for API URLs

As technical writers, your goal is not just to understand URL components but to document them effectively for your audience. Here are specific documentation best practices for API URLs:

### 1. Create Clear Visual Hierarchies

Document URL components using visual aids:

```
https://api.example.com/v2/users/12345?fields=name,email
└─┬─┘ └───┬───┘ └┬┘└─┬─┘└┬┘ └────┬────┘
  │       │      │   │   │       └─ Query Parameters
  │       │      │   │   └─ Resource ID
  │       │      │   └─ Collection
  │       │      └─ Version
  │       └─ Domain
  └─ Protocol
```

### 2. Use Consistent Formatting

Establish and follow formatting standards in your documentation:

* Use `code formatting` for all URL components
* Bold or color-code variable parts that users must replace
* Include parameters tables that explain each variable component

### 3. Include Clear Examples

Provide multiple examples for different use cases:

* Basic example (minimal required parameters)
* Complete example (all possible parameters)
* Error examples (showing common mistakes)

### 4. Document URL Parameters Thoroughly

When documenting URL parameters, create comprehensive parameter tables that answer all possible developer questions. Here's a model parameter documentation table structure:

<div class="parameter-documentation-example">
  <h4>World-Class URL Parameter Documentation</h4>
  
  <table class="params-table">
    <thead>
      <tr>
        <th width="15%">Property</th>
        <th width="20%">Documentation Guidance</th>
        <th width="65%">Example</th>
      </tr>
    </thead>
    <tbody>
      <tr class="required-param">
        <td><strong>Name</strong><br><span class="param-required">Required</span></td>
        <td>
          <ul>
            <li>Use exact casing as expected by API</li>
            <li>Use code formatting</li>
            <li>Indicate if case-sensitive</li>
          </ul>
        </td>
        <td>
          <p><code>productId</code> <i>(case-sensitive)</i></p>
        </td>
      </tr>
      <tr>
        <td><strong>Description</strong></td>
        <td>
          <ul>
            <li>Write 1-2 clear sentences</li>
            <li>Start with a verb</li>
            <li>Include business context</li>
          </ul>
        </td>
        <td>
          <p>Specifies the unique identifier of the product to retrieve. This ID is generated when a product is created and remains constant across all environments.</p>
        </td>
      </tr>
      <tr>
        <td><strong>Location</strong></td>
        <td>
          <ul>
            <li>Specify exactly where parameter appears</li>
            <li>Use consistent terminology</li>
          </ul>
        </td>
        <td>
          <p>Path parameter <i>(in URL path)</i></p>
          <p class="text-muted">Other examples: Query parameter, Path parameter, Header</p>
        </td>
      </tr>
      <tr>
        <td><strong>Data Type</strong></td>
        <td>
          <ul>
            <li>Use language-neutral terms</li>
            <li>Include format for complex types</li>
            <li>Link to schemas for objects</li>
          </ul>
        </td>
        <td>
          <p><code>string</code> (UUID format)</p>
          <p class="text-muted">Other examples: <code>integer</code>, <code>boolean</code>, <code>array</code> of strings, <code>object</code> (see <a href="#">schema</a>)</p>
        </td>
      </tr>
      <tr>
        <td><strong>Required?</strong></td>
        <td>
          <ul>
            <li>Be explicit about requirement</li>
            <li>Explain any conditional requirements</li>
            <li>Use visual indicators</li>
          </ul>
        </td>
        <td>
          <p><span class="badge required">Required</span></p>
          <p class="text-muted">Or: <span class="badge optional">Optional</span>, <span class="badge conditional">Required if <code>type=detailed</code></span></p>
        </td>
      </tr>
      <tr>
        <td><strong>Default</strong></td>
        <td>
          <ul>
            <li>Always document if there is a default</li>
            <li>Use exact value format</li>
            <li>Explain if not applicable</li>
          </ul>
        </td>
        <td>
          <p><code>None</code> (must be specified)</p>
          <p class="text-muted">Other examples: <code>10</code>, <code>"latest"</code>, <code>false</code>, <code>3 days ago</code></p>
        </td>
      </tr>
      <tr>
        <td><strong>Constraints</strong></td>
        <td>
          <ul>
            <li>List all validation rules</li>
            <li>Include min/max values</li>
            <li>Document character limitations</li>
          </ul>
        </td>
        <td>
          <ul class="constraint-list">
            <li>Must be a valid UUID v4 format</li>
            <li>32 characters plus hyphens</li>
            <li>Case-insensitive</li>
          </ul>
          <p class="text-muted">Other examples: 1-100 characters, Values: <code>ASC</code> or <code>DESC</code>, Must match pattern: <code>[A-Z0-9]{8}</code></p>
        </td>
      </tr>
      <tr>
        <td><strong>Examples</strong></td>
        <td>
          <ul>
            <li>Provide multiple realistic examples</li>
            <li>Show both valid and invalid examples</li>
            <li>Include full context</li>
          </ul>
        </td>
        <td>
          <p><strong>Valid:</strong></p>
          <pre><code>GET /products/3fa85f64-5717-4562-b3fc-2c963f66afa6</code></pre>
          <p><strong>Invalid:</strong></p>
          <pre><code>GET /products/123 <span class="error-text">// Error: Invalid UUID format</span></code></pre>
        </td>
      </tr>
      <tr>
        <td><strong>Notes</strong></td>
        <td>
          <ul>
            <li>Include edge cases</li>
            <li>Document common errors</li>
            <li>Add related parameters</li>
          </ul>
        </td>
        <td>
          <div class="box">
            <p><i class="note-icon">ℹ️</i> The <code>productId</code> for sandbox environments uses a different format prefix than production. Sandbox products always start with <code>TEST-</code>.</p>
            <p><i class="note-icon">⚠️</i> This parameter cannot be used with the <code>productSku</code> parameter.</p>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<style>
.parameter-documentation-example {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  padding: 20px;
  margin: 25px 0 35px 0;
  overflow: hidden;
}

.parameter-documentation-example h4 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 20px;
  border-bottom: 2px solid #eaecef;
  padding-bottom: 10px;
}

.params-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95em;
}

.params-table th {
  background-color: #f8f9fb;
  padding: 12px 15px;
  text-align: left;
  font-weight: 600;
  color: #2c3e50;
  border-bottom: 2px solid #eaecef;
}

.params-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #eaecef;
  vertical-align: top;
}

.params-table tr:last-child td {
  border-bottom: none;
}

.params-table ul {
  margin: 0;
  padding-left: 18px;
}

.params-table li {
  margin-bottom: 4px;
}

.params-table li:last-child {
  margin-bottom: 0;
}

.param-required {
  font-size: 0.75em;
  color: #e74c3c;
  font-weight: 600;
  text-transform: uppercase;
}

.required-param td {
  background-color: #fffbf6;
}

.badge {
  display: inline-block;
  padding: 3px 6px;
  border-radius: 3px;
  font-size: 0.75em;
  font-weight: 600;
  text-transform: uppercase;
}

.required {
  background-color: #fef2f2;
  color: #e53e3e;
  border: 1px solid #fbd5d5;
}

.optional {
  background-color: #f0f9ff;
  color: #3b82f6;
  border: 1px solid #bae6fd;
}

.conditional {
  background-color: #fffbeb;
  color: #d97706;
  border: 1px solid #fde68a;
}

.text-muted {
  color: #718096;
  font-size: 0.9em;
  margin-top: 6px;
  margin-bottom: 0;
}

code {
  background-color: #f1f1f1;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 0.9em;
}

pre {
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
  margin: 8px 0;
  overflow-x: auto;
}

pre code {
  background: none;
  padding: 0;
  font-size: 0.9em;
}

.constraint-list {
  margin: 0;
  padding-left: 18px;
}

.error-text {
  color: #e53e3e;
}

.note-box {
  background-color: #f8f9fa;
  border-left: 4px solid #3b82f6;
  padding: 10px 12px;
  margin-top: 8px;
  border-radius: 0 4px 4px 0;
}

.note-box p {
  margin: 6px 0;
}

.note-box p:first-child {
  margin-top: 0;
}

.note-box p:last-child {
  margin-bottom: 0;
}

.note-icon {
  margin-right: 6px;
}
</style>

This comprehensive parameter table structure includes all essential information developers need, presented in a visually clear format. Using this consistent structure for all parameters ensures your documentation is thorough and accessible. Each row provides both guidance for technical writers and real-world examples.

### 5. Address Common Documentation Challenges

When documenting APIs, be prepared to handle:

* **Environment differences**: Document how URLs change between development, staging, and production
* **Authentication details**: Clearly mark where authentication tokens belong in the URL or headers
* **Encoding requirements**: Explain which parameters need special encoding and why
* **Rate limits**: Document any URL-based rate limiting (e.g., per endpoint)

Remember that good API documentation helps developers implement your API correctly the first time, reducing support burden and improving adoption.

You've now learned advanced concepts of URL anatomy for API documentation. In the next chapter, we'll explore [data formats](/dataformats.html) used in API communication, which will build upon the URL concepts we've mastered here.

<div class="interactive-quiz">
  <h3>Test Your Knowledge: URL Anatomy</h3>
  <div class="quiz-question">
    <p>Look at this URL: <code>https://api.example.com/v2/products/electronics?brand=apple&sort=price#details</code></p>
    <p>Can you identify:</p>
    <ol>
      <li>The endpoint</li>
      <li>The resource path</li>
      <li>The query parameters</li>
      <li>The fragment identifier</li>
    </ol>
    <button class="quiz-button" onclick="toggleAnswer()">Show Answer</button>
    <div class="quiz-answer" id="quiz-answer" style="display: none;">
      <ol>
        <li><strong>Endpoint:</strong> <code>https://api.example.com/v2/products/electronics?brand=apple&sort=price</code></li>
        <li><strong>Resource path:</strong> <code>/v2/products/electronics</code></li>
        <li><strong>Query parameters:</strong> <code>brand=apple&sort=price</code></li>
        <li><strong>Fragment identifier:</strong> <code>details</code></li>
      </ol>
    </div>
  </div>
</div>

<script>
  function toggleAnswer() {
    var answerDiv = document.getElementById('quiz-answer');
    var button = document.querySelector('.quiz-button');
    
    if (answerDiv.style.display === 'none') {
      answerDiv.style.display = 'block';
      button.textContent = 'Hide Answer';
    } else {
      answerDiv.style.display = 'none';
      button.textContent = 'Show Answer';
    }
  }
</script>

<style>
  .interactive-quiz {
    background-color: #f0f7fb;
    border-left: 5px solid #3a87ad;
    padding: 20px;
    margin: 30px 0;
    border-radius: 0 8px 8px 0;
  }
  
  .interactive-quiz h3 {
    color: #3a87ad;
    margin-top: 0;
    margin-bottom: 15px;
  }
  
  .quiz-question p {
    margin-bottom: 10px;
  }
  
  .quiz-button {
    background-color: #3a87ad;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    margin-top: 10px;
    transition: background-color 0.2s ease;
  }
  
  .quiz-button:hover {
    background-color: #2a6d8e;
  }
  
  .quiz-answer {
    margin-top: 15px;
    background-color: white;
    padding: 15px;
    border-radius: 4px;
    border-left: 3px solid #28a745;
  }
  
  .quiz-answer ol {
    margin-bottom: 0;
  }
</style>

{% include faq-section.html data_file="url_faqs" %}

{% include key_takeaways.html content="
<ul>
  <li>Endpoints are complete URLs used to access API resources, including protocol, domain, path, and query parameters</li>
  <li>Resources are data objects or entities exposed by an API, typically represented as JSON or XML</li>
  <li>URL encoding is essential for handling special characters in URLs, converting them to a web-safe format</li>
  <li>Use absolute URLs for standalone examples and relative URLs for environment-agnostic documentation</li>
  <li>Follow RESTful URL design best practices: use nouns, maintain hierarchies, and be consistent</li>
  <li>Prioritize security in URL design by using HTTPS, avoiding sensitive data in URLs, and implementing proper authentication</li>
</ul>
" %}

{% include quiz.html
  title="Test Your Knowledge"
  description="Check your understanding of advanced URL concepts with this quiz."
  quizDataFile="anatomyofurltwo_questions"
  theme="blue"
  animate=true
%}


<div class="author-cta">
  <img src="{{ site.baseurl }}/assets/images/gaurav.svg" alt="Technical Writing Expert" class="author-image">
  <div class="author-message">
    <h4>Was this guide helpful?</h4>
    <p>If you found this advanced URL anatomy guide valuable, please share it with your colleagues or on social media. Your feedback helps us improve our content!</p>
    <div class="social-share">
      <a href="https://twitter.com/intent/tweet?url={{ site.url }}{{ page.url }}&text=Check out this excellent guide on advanced URL anatomy for API documentation" class="share-button twitter">Share on Twitter</a>
      <a href="https://www.linkedin.com/shareArticle?mini=true&url={{ site.url }}{{ page.url }}&title=Advanced URL Anatomy in API Documentation" class="share-button linkedin">Share on LinkedIn</a>
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
  title="Advanced URL Resources"
  description="Expand your understanding of URL structure with these carefully selected resources."
  external_links="URL Design Guide for RESTful APIs,https://restfulapi.net/resource-naming/|HTTP Status Codes Reference,https://developer.mozilla.org/en-US/docs/Web/HTTP/Status"
  tools="URL Parser and Decoder,https://www.urlencoder.org/|Postman API Testing Tool,https://www.postman.com/"
%}