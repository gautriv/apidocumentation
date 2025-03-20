---
layout: chapter
title: "cURL for API Documentation"
description: "Master cURL, the command-line tool for testing and documenting APIs. Learn to send requests, authenticate, debug API calls, and more without writing code."
module_id: "api-documentation"
module_title: "API Documentation"
chapter_number: 5
permalink: /curl.html
next_chapter: "/intermediaterestapiexercises.html"
next_title: "Intermediate REST API Documentation Exercises"
prev_chapter: "/keyconcepts.html"
prev_title: "Bridging the Gaps - Key API Concepts"
module_chapters:
  - number: 1
    title: "Understanding API Requests and Responses"
    url: "/apirequestsresponses.html"
  - number: 2
    title: "Writing API Documentation"
    url: "/writingapi.html"
  - number: 3
    title: "Beginner REST API Documentation Exercises"
    url: "/beginnerrestapiexercises.html"
  - number: 4
    title: "Bridging the Gaps - Key API Concepts"
    url: "/keyconcepts.html"
  - number: 5
    title: "cURL for API Documentation"
    url: "/curl.html"
  - number: 6
    title: "Intermediate REST API Documentation Exercises"
    url: "/intermediaterestapiexercises.html"
  - number: 7
    title: "Expert REST API Documentation Exercises"
    url: "/expertrestapiexercises.html"
resources:
  - title: "Official cURL Documentation"
    url: "https://curl.se/docs/"
  - title: "cURL Command Builder"
    url: "https://curlbuilder.com/"
  - title: "cURL Cookbook"
    url: "https://catonmat.net/cookbooks/curl"
  - title: "Using cURL to Test REST APIs"
    url: "https://www.baeldung.com/curl-rest"
---

<style>
/* Code Block Styling */
.code-block {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  overflow-x: auto;
  position: relative;
}

.code-block pre {
  margin: 0;
  padding: 0;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

.code-block code {
  color: #d4d4d4;
  display: block;
  white-space: pre;
  overflow-x: auto;
}

/* Table Styling */
.comparison-table {
  margin: 1.5rem 0;
  overflow-x: auto;
  width: 100%;
}

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.comparison-table th,
.comparison-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.comparison-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
}

.comparison-table td:first-child {
  font-family: 'Fira Code', monospace;
  white-space: nowrap;
  min-width: 100px;
}

.comparison-table td:nth-child(2) {
  min-width: 200px;
}

.comparison-table tr:hover {
  background: #f8f9fa;
}

/* Example Box Styling */
.example-box {
  background: #f8f9fa;
  border-left: 4px solid #3498db;
  border-radius: 4px;
  padding: 1rem;
  margin: 1rem 0;
}

.example-header {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.example-content {
  background: #1e1e1e;
  border-radius: 4px;
  padding: 1rem;
  overflow-x: auto;
}

.example-content pre {
  margin: 0;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

.example-content code {
  color: #d4d4d4;
  display: block;
  white-space: pre;
  overflow-x: auto;
}

/* Info Box Styling */
.info-box {
  background: #f8f9fa;
  border-left: 4px solid #2ecc71;
  border-radius: 4px;
  padding: 1rem;
  margin: 1rem 0;
}

.info-box-title {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.info-box-content {
  color: #34495e;
}

/* Container Consistency */
.chapter-section {
  max-width: 100%;
  overflow-x: hidden;
}

.chapter-section h2,
.chapter-section h3,
.chapter-section h4 {
  color: #2c3e50;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.chapter-section p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.chapter-section ul {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.chapter-section li {
  margin-bottom: 0.5rem;
}
</style>

<div class="chapter-section">
  <h2 id="introduction">Introduction</h2>
  
  <p class="intro-text">You've already tackled API fundamentals—rate limits, authentication, pagination, and error handling. Now, it's time to level up and master cURL, the command-line Swiss Army knife for API testing.</p>
  
  <p>As you progress in your API documentation journey, understanding tools that help you interact with APIs becomes increasingly important. cURL is one of the most versatile and widely-used tools for this purpose.</p>
</div>

<div class="chapter-section">
  <h2 id="chapter-overview">Chapter Overview</h2>
  
  <p>This chapter focuses on mastering cURL for API testing and documentation. We'll cover:</p>
  
  <div class="chapter-goals">
    <ul>
      <li><strong>cURL Basics</strong> – Understanding what cURL is and its fundamental concepts</li>
      <li><strong>HTTP Methods</strong> – How to use GET, POST, PUT, DELETE requests with cURL</li>
      <li><strong>Request Components</strong> – Working with headers, parameters, and request bodies</li>
      <li><strong>Authentication</strong> – Implementing various auth methods including API keys and OAuth</li>
      <li><strong>Debugging</strong> – Troubleshooting API calls with verbose mode and other techniques</li>
    </ul>
  </div>
</div>

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

<div class="chapter-section">
  <h2 id="importance">Why Learn cURL?</h2>
  
  <p>Whether you're an API technical writer, developer, or tester, mastering cURL will make your life significantly easier. Here's why:</p>
  
  <ul>
    <li><strong>No Code Required</strong> – Test APIs without writing application code</li>
    <li><strong>Universal Tool</strong> – cURL is available on virtually all operating systems</li>
    <li><strong>Documentation Examples</strong> – Most API docs include cURL examples</li>
    <li><strong>Debugging Power</strong> – Easily inspect headers, status codes, and responses</li>
    <li><strong>Automation Potential</strong> – Create scripts to automate API testing</li>
  </ul>
  
  <div class="info-box">
    <div class="info-box-title">Did You Know?</div>
    <div class="info-box-content">
      <p>cURL was first released in 1997 and now supports over 25+ protocols, not just HTTP/HTTPS. It's installed by default on macOS, Linux, and newer versions of Windows 10.</p>
    </div>
  </div>
</div>

<div class="chapter-section">
  <h2 id="what-is-curl">What is cURL?</h2>
  
  <p>cURL (short for <em>Client URL</em>) is a command-line tool used for transferring data with URLs. It's like Postman or Insomnia, but without the graphical user interface.</p>
  
  <p>A basic cURL command looks like this:</p>
  
  <div class="code-block">
    <pre><code class="language-bash">curl https://api.example.com</code></pre>
  </div>
  
  <p>This sends a GET request to <code>https://api.example.com</code>. By default, cURL outputs the response body to the terminal.</p>
  
  <p>cURL is incredibly versatile—it supports numerous protocols (HTTP, HTTPS, FTP, SMTP), various authentication methods, and virtually all aspects of the HTTP specification.</p>
</div>

<div class="chapter-section">
  <h2 id="http-methods">HTTP Methods with cURL</h2>
  
  <p>APIs support different HTTP methods, and cURL makes it easy to use them. While GET is the default, you can specify other methods with the <code>-X</code> flag:</p>
  
  <div class="comparison-table">
    <table>
      <thead>
        <tr>
          <th>HTTP Method</th>
          <th>cURL Command</th>
          <th>Use Case</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>GET</strong></td>
          <td><code>curl -X GET "https://api.example.com/users"</code></td>
          <td>Retrieve data</td>
        </tr>
        <tr>
          <td><strong>POST</strong></td>
          <td><code>curl -X POST "https://api.example.com/users" -d '{"name":"John"}' -H "Content-Type: application/json"</code></td>
          <td>Create new data</td>
        </tr>
        <tr>
          <td><strong>PUT</strong></td>
          <td><code>curl -X PUT "https://api.example.com/users/1" -d '{"name":"John Updated"}' -H "Content-Type: application/json"</code></td>
          <td>Update existing data</td>
        </tr>
        <tr>
          <td><strong>DELETE</strong></td>
          <td><code>curl -X DELETE "https://api.example.com/users/1"</code></td>
          <td>Remove data</td>
        </tr>
        <tr>
          <td><strong>PATCH</strong></td>
          <td><code>curl -X PATCH "https://api.example.com/users/1" -d '{"name":"John Patched"}' -H "Content-Type: application/json"</code></td>
          <td>Partial update</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <div class="example-box">
    <div class="example-header">Example: Retrieving User Data</div>
    <div class="example-content">
      <pre><code class="language-bash"># Get a list of users
curl -X GET "https://api.example.com/users"

# Get a specific user by ID
curl -X GET "https://api.example.com/users/123"</code></pre>
    </div>
  </div>
</div>

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

<div class="chapter-section">
  <h2 id="request-components">Request Components</h2>
  
  <h3>Adding Headers</h3>
  
  <p>Headers provide additional information about the request. Use the <code>-H</code> flag to include headers:</p>
  
  <div class="code-block">
    <pre><code class="language-bash">curl -X GET "https://api.example.com/users" \
     -H "Authorization: Bearer your_token" \
     -H "Accept: application/json"</code></pre>
  </div>
  
  <h3>Query Parameters</h3>
  
  <p>Query parameters allow you to filter or modify the requested data. Simply include them in the URL:</p>
  
  <div class="code-block">
    <pre><code class="language-bash">curl -X GET "https://api.example.com/users?limit=10&sort=desc"</code></pre>
  </div>
  
  <h3>Sending Request Bodies</h3>
  
  <p>For POST, PUT, and PATCH requests, you often need to send data in the request body. Use the <code>-d</code> flag for this:</p>
  
  <h4>JSON Data</h4>
  
  <div class="code-block">
    <pre><code class="language-bash">curl -X POST "https://api.example.com/users" \
     -d '{"name":"John","email":"john@example.com"}' \
     -H "Content-Type: application/json"</code></pre>
  </div>
  
  <h4>Form Data</h4>
  
  <div class="code-block">
    <pre><code class="language-bash">curl -X POST "https://api.example.com/login" \
     --data-urlencode "username=johndoe" \
     --data-urlencode "password=securepass"</code></pre>
  </div>
  
  <div class="info-box">
    <div class="info-box-title">Pro Tip</div>
    <div class="info-box-content">
      <p>When sending JSON data with special characters or formatting, you can store the JSON in a file and reference it: <code>curl -X POST "https://api.example.com/users" -d @data.json</code></p>
    </div>
  </div>
</div>

<div class="chapter-section">
  <h2 id="authentication">Authentication Methods</h2>
  
  <p>APIs use various authentication mechanisms to secure access. Here's how to handle them with cURL:</p>
  
  <h3>API Key Authentication</h3>
  
  <div class="code-block">
    <pre><code class="language-bash"># As a header
curl -X GET "https://api.example.com/users" \
     -H "API-Key: your_api_key"

# As a query parameter
curl -X GET "https://api.example.com/users?api_key=your_api_key"</code></pre>
  </div>
  
  <h3>Bearer Token Authentication</h3>
  
  <div class="code-block">
    <pre><code class="language-bash">curl -X GET "https://api.example.com/users" \
     -H "Authorization: Bearer your_token"</code></pre>
  </div>
  
  <h3>Basic Authentication</h3>
  
  <div class="code-block">
    <pre><code class="language-bash"># Using the -u flag
curl -X GET "https://api.example.com/users" \
     -u username:password

# Manually in header (Base64 encoded)
curl -X GET "https://api.example.com/users" \
     -H "Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ="</code></pre>
  </div>
  
  <h3>OAuth 2.0 Authentication</h3>
  
  <div class="code-block">
    <pre><code class="language-bash"># First, obtain a token
curl -X POST "https://auth.example.com/oauth/token" \
     -d "grant_type=client_credentials" \
     -d "client_id=your_client_id" \
     -d "client_secret=your_client_secret"

# Then use the token
curl -X GET "https://api.example.com/users" \
     -H "Authorization: Bearer your_access_token"</code></pre>
  </div>
</div>

<div class="chapter-section">
  <h2 id="file-operations">Working with Files</h2>
  
  <h3>Uploading Files</h3>
  
  <p>Use the <code>-F</code> flag for multipart form data uploads:</p>
  
  <div class="code-block">
    <pre><code class="language-bash">curl -X POST "https://api.example.com/upload" \
     -F "file=@/path/to/myfile.jpg" \
     -F "description=Profile picture"</code></pre>
  </div>
  
  <h3>Downloading Files</h3>
  
  <div class="code-block">
    <pre><code class="language-bash"># Save with original filename
curl -O "https://example.com/files/document.pdf"

# Save with a custom filename
curl -o "custom_name.pdf" "https://example.com/files/document.pdf"</code></pre>
  </div>
</div>

<div class="chapter-section">
  <h2 id="debugging">Debugging API Calls</h2>
  
  <p>cURL provides several options for debugging API interactions:</p>
  
  <h3>Viewing Response Headers</h3>
  
  <div class="code-block">
    <pre><code class="language-bash"># Include headers in the output
curl -i "https://api.example.com/users"

# Only show headers, not the body
curl -I "https://api.example.com/users"</code></pre>
  </div>
  
  <h3>Verbose Mode</h3>
  
  <p>To see everything happening under the hood, including the request and response details:</p>
  
  <div class="code-block">
    <pre><code class="language-bash">curl -v "https://api.example.com/users"</code></pre>
  </div>
  
  <h3>Silent Mode</h3>
  
  <p>When you want only the response body without progress meters or error messages:</p>
  
  <div class="code-block">
    <pre><code class="language-bash">curl -s "https://api.example.com/users"</code></pre>
  </div>
  
  <h3>Following Redirects</h3>
  
  <div class="code-block">
    <pre><code class="language-bash">curl -L "https://api.example.com/redirect"</code></pre>
  </div>
  
  <div class="example-box">
    <div class="example-header">Example: Debugging an API Error</div>
    <div class="example-content">
      <pre><code class="language-bash"># Using verbose mode to see what's happening
curl -v "https://api.example.com/users/invalid"

# Getting just the status code
curl -s -o /dev/null -w "%{http_code}" "https://api.example.com/users/invalid"</code></pre>
    </div>
  </div>
</div>

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

<div class="chapter-section">
  <h2 id="common-flags">Essential cURL Flags Reference</h2>
  
  <div class="comparison-table">
    <table>
      <thead>
        <tr>
          <th>Flag</th>
          <th>Description</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>-X</code></td>
          <td>Specify HTTP method</td>
          <td><code>curl -X POST "https://api.example.com"</code></td>
        </tr>
        <tr>
          <td><code>-H</code></td>
          <td>Add a request header</td>
          <td><code>curl -H "Accept: application/json" "https://api.example.com"</code></td>
        </tr>
        <tr>
          <td><code>-d</code></td>
          <td>Send request body</td>
          <td><code>curl -d '{"name":"John"}' "https://api.example.com"</code></td>
        </tr>
        <tr>
          <td><code>-F</code></td>
          <td>Upload form data (files)</td>
          <td><code>curl -F "file=@photo.jpg" "https://api.example.com/upload"</code></td>
        </tr>
        <tr>
          <td><code>-u</code></td>
          <td>Basic authentication</td>
          <td><code>curl -u username:password "https://api.example.com"</code></td>
        </tr>
        <tr>
          <td><code>-i</code></td>
          <td>Include response headers</td>
          <td><code>curl -i "https://api.example.com"</code></td>
        </tr>
        <tr>
          <td><code>-I</code></td>
          <td>Show only headers</td>
          <td><code>curl -I "https://api.example.com"</code></td>
        </tr>
        <tr>
          <td><code>-v</code></td>
          <td>Verbose mode</td>
          <td><code>curl -v "https://api.example.com"</code></td>
        </tr>
        <tr>
          <td><code>-s</code></td>
          <td>Silent mode</td>
          <td><code>curl -s "https://api.example.com"</code></td>
        </tr>
        <tr>
          <td><code>-L</code></td>
          <td>Follow redirects</td>
          <td><code>curl -L "https://api.example.com"</code></td>
        </tr>
        <tr>
          <td><code>-o</code></td>
          <td>Save output to file</td>
          <td><code>curl -o output.json "https://api.example.com"</code></td>
        </tr>
        <tr>
          <td><code>-O</code></td>
          <td>Save with remote filename</td>
          <td><code>curl -O "https://example.com/file.pdf"</code></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="chapter-section">
  <h2 id="documenting-with-curl">Using cURL in API Documentation</h2>
  
  <p>As a technical writer, knowing how to craft effective cURL examples is crucial:</p>
  
  <h3>Best Practices for cURL Examples</h3>
  
  <ul>
    <li><strong>Be Consistent</strong> – Use the same style for all examples</li>
    <li><strong>Use Line Breaks</strong> – For readability in complex commands</li>
    <li><strong>Include Comments</strong> – Explain what each part does</li>
    <li><strong>Provide Complete Examples</strong> – Show real-world usage scenarios</li>
    <li><strong>Show Request and Response</strong> – Include expected responses</li>
  </ul>
  
  <div class="example-box">
    <div class="example-header">Well-Documented cURL Example</div>
    <div class="example-content">
      <pre><code class="language-bash"># Request: Create a new user
curl -X POST "https://api.example.com/v1/users" \
     -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "John Doe",
       "email": "john@example.com",
       "role": "admin"
     }'

# Response (Status: 201 Created)
{
  "id": "user_123456",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "admin",
  "created_at": "2023-06-15T14:22:33Z"
}</code></pre>
    </div>
  </div>
</div>

<div class="chapter-section">
  <h2 id="next-steps">Next Steps</h2>
  
  <p>Congratulations! You're now fluent in cURL, ready to test APIs like a pro. This skill will be invaluable as you document APIs and create code samples.</p>
  
  <p>In the next chapter, we'll explore how to create effective code samples and SDKs that complement your API documentation, building on your new cURL knowledge.</p>
</div>

<div class="chapter-section">
  
  <p>cURL is an essential tool in any API documentation professional's toolkit. It allows you to interact with APIs directly, test endpoints, and create clear, accurate examples for your documentation.</p>
  
  <p>By mastering cURL, you've added a powerful skill that will enhance your API documentation and make you more effective at testing and verifying API functionality.</p>
  
  <div class="chapter-takeaways">
    <h3 class="chapter-takeaways-header">Key Takeaways</h3>
    <div class="chapter-takeaways-content">
      <ul class="chapter-takeaways-list">
        <li>cURL is a versatile command-line tool for making HTTP requests</li>
        <li>It supports all HTTP methods and request components including headers and bodies</li>
        <li>cURL can handle various authentication methods including API keys and OAuth</li>
        <li>Debugging tools like verbose mode help troubleshoot API interactions</li>
        <li>Well-crafted cURL examples enhance API documentation quality</li>
      </ul>
    </div>
  </div>
</div> 