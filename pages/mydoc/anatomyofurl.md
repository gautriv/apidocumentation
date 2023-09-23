---
title: Anatomy of URL
keywords: [API documentation, API information gathering, API documentation best practices, API documentation tools, API documentation planning, API documentation structure, API documentation writing, API documentation testing, API documentation review, API documentation publishing, API documentation maintenance, API documentation improvement, Writing API documentation, Understanding API, Identifying target audience, Documentation goals, Gathering API information, Organizing documentation structure, Writing clear content, Including code samples, Testing API documentation, Seeking feedback on documentation, Publishing API documentation, Maintaining API documentation, Continuous improvement in documentation, Technical writing for APIs, API documentation platforms, Effective API documentation, User-friendly API documentation, URLs, API documentation, web addresses, web resources, protocols, domains, paths, query parameters, endpoints, developers, marketers, troubleshoot API issues, track website performance, API development, web development, resources access, API understanding, API usage, API resources, API endpoints, API troubleshoot, API performance tracking, API mastery]
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
<p>In our URL the protocol is <code>https://</code>. </p>
<p>The World Wide Web, the cornerstone of modern information exchange and communication, operates on a structured protocol known as HTTP, or Hypertext Transfer Protocol. At its core, HTTP is the language that web browsers and servers use to converse with each other, enabling the seamless retrieval and delivery of web content. While most of us interact with the web daily, the inner workings of HTTP methods and their significance remain a mystery to many.</p>

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

<h3>6. Other HTTP Methods:</h3>

<p>While the five primary HTTP methods (GET, POST, PUT, PATCH, DELETE) cover the majority of use cases in web development and API design, there are several other HTTP methods that serve specialized purposes. These less commonly used methods are valuable tools in specific scenarios. In this section, we'll explore some of these lesser-known HTTP methods and their unique roles.</p>

<h4>1. HEAD Method:</h4>
    <p><strong>Purpose:</strong> The HEAD method is similar to GET but without the response body. It is used to retrieve only the headers of a resource, providing metadata about the resource, such as its content type and length.</p>
    <p>Example Request:</p>
    <pre><code>HEAD /api/resource</code></pre>
<p>Example Response:</p>
<pre><code>Example Response:200 OK
Content-Type: application/json
Content-Length: 123</code></pre>
<p>The HEAD method is useful for checking resource availability or obtaining metadata without downloading the entire content.</p>

<h4>2. OPTIONS Method:</h4>
<p><strong>Purpose:</strong> The OPTIONS method is used to request information about the communication options available for a resource. It retrieves details about the supported HTTP methods, headers, and other capabilities of the server.</p>
<p>Example Request:</p>
<pre><code>OPTIONS /api/resource</code></pre>
<p>Example Response:</p>
<pre><code>200 OK
Allow: GET, POST, PUT, DELETE</code></pre>
    
<p>The OPTIONS method helps clients understand what actions they can perform on a resource.</p>

<h4>3. TRACE Method:</h4>
<p><strong>Purpose:</strong> The TRACE method is primarily used for diagnostic purposes. It echoes the received request back to the client, allowing it to see how the request was modified by intermediaries (such as proxies or load balancers).</p>
<p>Example Request:</p>
<pre><code>TRACE /path/to/resource</code></pre>
<p>Example Response:</p>
<pre><code>200 OK
Content-Type: message/http
TRACE /path/to/resource HTTP/1.1
Host: example.com </code></pre>
<p>TRACE can help in debugging and understanding the request-response flow.</p>

<h4>4. CONNECT Method:</h4>
    
<p><strong>Purpose:</strong> The CONNECT method is used to establish a network connection to a resource, typically through a proxy server. It is often used for creating secure tunnels for encrypted communication, such as HTTPS.</p>
<p>Example Request:</p>
<pre><code>CONNECT example.com:443</code></pre>
<p>Example Response:</p>
<pre><code>200 OK</code></pre>
    
<p>CONNECT is mainly used for setting up secure connections through proxy servers.</p>

<h4>5. PATCH Method (RFC 5789):</h4>
<p>It's worth noting that there is a standardized PATCH method (as discussed earlier), but there's also an older version of PATCH defined in RFC 5789. The RFC 5789 PATCH method is less commonly used today, and the usage of the newer PATCH method is recommended for partial updates.</p>

<p>These less common HTTP methods serve specific niches in web communication and are not typically used in everyday web development. However, they are essential tools for specialized tasks, diagnostics, and advanced networking scenarios. Understanding their existence and potential use cases can be valuable for experienced developers and network administrators.</p>

<h2>How to Identify a Protocol in a URL?</h2>
<p>A URL (Uniform Resource Locator) consists of several components, and the protocol is one of them. It specifies how your browser or client should communicate with a web server to retrieve a resource. Here's how to identify the protocol in a URL:</p>

<ol>
        <li>
            <strong>Look at the Beginning of the URL:</strong> The protocol is indicated at the very beginning of a URL, right before the colon (:), and is followed by two slashes (//). For example:
            <ul>
                <li>HTTP protocol: <code>http://www.example.com</code></li>
                <li>HTTPS protocol: <code>https://www.example.com</code></li>
                <li>FTP protocol: <code>ftp://ftp.example.com</code></li>
            </ul>
        </li>
        <li>
        <strong>Identify the Protocol Keyword:</strong> The protocol keyword (e.g., <code>http</code>, <code>https</code>, <code>ftp</code>) specifies the communication method or protocol to be used. It tells your browser or client how to connect to the server and what rules to follow for data exchange.
        </li>
        <li>
        <strong>Understand the Purpose of the Protocol:</strong> Different protocols serve different purposes. For example:
            <ul>
                <li>HTTP (Hypertext Transfer Protocol) is used for standard web page access.</li>
                <li>HTTPS (HTTP Secure) is a secure version of HTTP, encrypted for secure data transfer.</li>
                <li>FTP (File Transfer Protocol) is used for transferring files to and from a server.</li>
            </ul>
        </li>
        <li>
            <strong>Note Any Secure Connections:</strong> If the URL begins with <code>https://</code> instead of <code>http://</code>, it signifies a secure connection, indicating that data exchanged between the client and the server is encrypted.
        </li>
    </ol>



<b><p>In summary:</p></b>
<ul>
<li>HTTP methods that can have a request body: POST, PUT, PATCH</li>
<li>HTTP methods that typically don't have a request body: GET, DELETE</li>
<li>HTTP methods that can have a response body: GET, POST, PUT, PATCH</li>
<li>HTTP methods that typically don't have a response body: DELETE</li>
</ul>

<p>The specific details of request and response bodies may vary depending on the API and its design, but these examples provide a general understanding of how these HTTP methods are used.</p>

<div class="question-box">
        <i class="fas fa-question"></i> Questions to ask yourself about HTTP methods and identifying protocols:
        <ul>
            <li>What is the purpose of the HTTP GET method?</li>
            <li>When is the HTTP POST method typically used?</li>
            <li>How does the HTTP PUT method differ from the PATCH method?</li>
            <li>What HTTP method is used for resource deletion?</li>
            <li>Where can you find the protocol in a URL?</li>
            <li>What is the significance of the protocol keyword in a URL?</li>
            <li>How do HTTP and HTTPS protocols differ in terms of security?</li>
            <li>What does it mean when a URL starts with "https://"?</li>
        </ul>
    </div>



</div>

<div id="domain" class="tabcontent">
  <!-- Content for Domain Name tab -->
  <h2>Domain Name</h2>
  <p>In our URL, the domain name is <code>www.google.com</code>.</p>
  <p>A domain is a website's internet address. It is the URL that you enter into your computer browser to see a website. For example, Google's domain is <code>google.com</code>, not <code>https://www.google.com</code>.</p>

  <p>Top-level domains (TLDs) and second-level domains (SLDs) are the two types of domains. The top-level domain (TLD) is the last part of the domain, such as <code>.com</code>, <code>.net</code>, or <code>.org</code>. The SLD is the part of the domain that appears before the TLD, such as google in <code>google.com</code>.</p>

  <h3>How do domains work?</h3>
  <p>Imagine you're on a quest to explore the vast landscape of the internet.</p>
  <p>Your trusty guide is your web browser. Whenever you decide to visit a website, here's what happens behind the scenes:</p>
    
  <ol>
    <li><strong>User's Request:</strong> You type "www.adventureland.com" into your browser.</li>
    <li><strong>DNS Request:</strong> Your browser asks the DNS server for the website's IP address.</li>
    <li><strong>DNS Lookup:</strong> The DNS server finds the IP address for "www.adventureland.com" (e.g., it's 192.168.1.1).</li>
    <li><strong>Browser's Journey:</strong> Your browser sails to the server at IP address 192.168.1.1.</li>
    <li><strong>Server Interaction:</strong> Your browser asks the server, "Show me www.adventureland.com."</li>
    <li><strong>Server Response:</strong> The server responds with the website's content.</li>
    <li><strong>Display:</strong> Your browser displays the website on your screen.</li>
  </ol>
    
  <h3>Domains in API documentation</h3>
    
  <p>Domains are important in API documentation because they identify the server that hosts the API. When you are using an API, you need to know the domain of the server to send requests to the API.</p>

  <p>For example, the following URL shows the domain of the Google Search API: <a href="https://developers.google.com/search/">https://developers.google.com/search/</a>:</p>
  <pre><code>https://developers.google.com/search/</code></pre>

  <p>The domain of the Google Search API is <code>developers.google.com</code>. This is the server that hosts the API, and it is the server that you need to send requests to in order to use the API.</p>

<div class="question-box">
        <i class="fas fa-question"></i> Questions to ask yourself about domain names and their role in URLs:
        <ul>
            <li>What exactly is a domain name, and how does it relate to a website's internet address?</li>
            <li>Why is the domain name often referred to as the website's URL?</li>
            <li>What is the difference between a top-level domain (TLD) and a second-level domain (SLD)?</li>
            <li>Can you give examples of common TLDs and SLDs?</li>
            <li>When you enter a domain in your browser, what happens behind the scenes to locate the website?</li>
            <li>What is the role of the DNS (Domain Name System) server in the process?</li>
            <li>How does the DNS server find the IP address associated with a domain name?</li>
            <li>Why is the IP address crucial for your browser to connect to the website's server?</li>
            <li>Why are domains important in the context of API documentation?</li>
            <li>How does knowing the domain of an API server help you when using an API?</li>
            <li>Can you identify the domain in a given API URL, and why is it essential to do so?</li>
            <li>What role does the API server's domain play in sending requests and receiving API responses?</li>
        </ul>
    </div>
</div>


<div id="path" class="tabcontent">
  <!-- Content for Path tab -->
<h2>Path</h2>
<p>In our example URL, the path is <code>/search?q=cats</code>.</p>
<p>The path of a URL is the part of the URL that identifies the specific resource that is being accessed. </p>
    
<p>Paths can be simple or complex. They can be static or dynamic. Static paths are always the same, while dynamic paths can vary depending on the resource that is being accessed.</p>

<h3>How do paths work?</h3>
<p>Imagine you're using your web browser to search for adorable cat videos on Google. You type in your query, hit the search button, and magically, a list of cat videos appears on your screen. Ever wondered how this happens behind the scenes? It's all about how the web and APIs (Application Programming Interfaces) work together.</p>
    
<p>When you, the client, send a request to an API, you provide a URL, and the path within that URL is like a GPS coordinate for the data you want to access. Think of it as the address to your desired resource.</p>
    
<p>For instance, consider the URL: <code>https://www.google.com/search?q=cats</code>. In this case, the path is <code>"/search?q=cats."</code> This path serves as a set of instructions for Google's Search API server. It tells the server that you're on the hunt for information about "cats."</p>

<p>Now, the API server, like a diligent librarian, takes this path and scours its vast database for everything related to "cats." It gathers up a list of cat-related websites, images, and videos, and bundles them all up into a neat package. Finally, it sends this treasure trove of cat content back to your browser, which then displays it on your screen.</p>

<p>So, in a nutshell, when you send a request to an API, the path in the URL guides the API server to the right shelf in its digital library, where it fetches the data you desire and delivers it to your device, making your quest for cat videos as smooth as a purring kitten's fur.</p>

<h3>Paths in API documentation</h3>
<p>Paths are important in API documentation because they tell technical writers how to access the resources that are provided by the API. When writing API documentation, technical writers should clearly document the paths of all of the resources that are provided by the API.</p>
    
<p>For example, the following API documentation for the Google Search API shows the path of the resource that is used to search for a term:</p>
    
<pre><code>GET /search?q={query}</code></pre>
    
<p>The path of this resource is <code>/search?q={query}</code>, where <code>{query}</code> is a placeholder for the term that the user wants to search for.</p>

<h2>How to Identify a Path in a URL?</h2>
    <p>
        To identify the path in a URL, follow these steps:
    </p>
    <ol>
        <li>
            <strong>Locate the Domain:</strong> The domain is usually the first part of the URL, like "https://www.example.com."
        </li>
        <li>
            <strong>Find the Slash (/) After the Domain:</strong> After the domain (and possibly port, if specified), there's typically a forward slash (/). The path starts after this slash.
        </li>
        <li>
            <strong>Read the Path:</strong> The path consists of one or more segments separated by forward slashes (/). Each segment in the path represents a directory or resource on the web server.
        </li>
    </ol>

    <p>
        For example, in the URL <code>"https://www.example.com/products/electronics/laptops,"</code> the path is <code>"/products/electronics/laptops."</code>
    </p>
 
<h3>Tips for Writing API Documentation for Paths:</h3>
    <ul>
        <li>Use descriptive and consistent naming conventions for paths.</li>
        <li>Document the path parameters that are used in each path.</li>
        <li>Provide examples of how to use each path.</li>
        <li>Explain what each path returns.</li>
        <li>Link to other relevant API documentation, such as the documentation for the resources that are returned by each path.</li>
    </ul>

<div class="question-box">
        <i class="fas fa-question"></i> Questions to ask yourself about the URL path:
        <ul>
            <li>Where does the path start? (Hint: After the domain)</li>
            <li>What's in the path? (Think of it as folders in a website)</li>
            <li>What specific resource or content does the path point to?</li>
            <li>How does the path hierarchy relate to the website's structure?</li>
            <li>Do any segments in the path indicate user categories or content types?</li>
            <li>Is there a pattern in the path that conveys information?</li>
        </ul>
    </div>
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