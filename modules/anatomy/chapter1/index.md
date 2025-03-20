---
layout: chapter
title: "Anatomy of URL part 1"
description: "Explore the various components of a URL including protocols, domain names, paths, query parameters, and fragment identifiers."
module_id: "anatomy"
module_title: "Anatomy of URLs"
chapter_number: 1
permalink: /anatomyofurl.html
next_chapter: "/anatomyofurltwo.html"
next_title: "API Endpoints and Resources"
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
  <h2 id="introduction">Introduction to URL Components</h2>
  
  <p class="intro-text">In the previous chapter, you learned about the main components of a REST API. I promised to dive deeper into the terms and definitions so that you have a clear understanding of them. So here we go.</p>
</div>

  <div class="url-anatomy-tabs">
    <div class="url-visual">
      <div class="highlight-area">
        <div class="url-string">
          <span class="protocol-part">https://</span><span class="domain-part">www.google.com</span><span class="path-part">/search</span><span class="query-part">?q=cats</span><span class="fragment-part">#my-fragment</span>
        </div>
      </div>
      <div class="url-parts">
        <div class="url-part protocol" data-tab="protocol">Protocol</div>
        <div class="url-part domain" data-tab="domain">Domain Name</div>
        <div class="url-part path" data-tab="path">Path</div>
        <div class="url-part query" data-tab="query">Query Parameters</div>
        <div class="url-part fragment" data-tab="fragment">Fragment Identifiers</div>
      </div>
    </div>
    
    <div class="url-tabs-navigation">
      <button class="url-tab-button active" data-tab="protocol">Protocol</button>
      <button class="url-tab-button" data-tab="domain">Domain Name</button>
      <button class="url-tab-button" data-tab="path">Path</button>
      <button class="url-tab-button" data-tab="query">Query Parameters</button>
      <button class="url-tab-button" data-tab="fragment">Fragment Identifiers</button>
    </div>
  
    <div id="protocol" class="url-tab-content active">
      <!-- Content for Protocol tab -->
      <h2>Protocol</h2>
      <p>In our URL, the protocol is <code>https://</code>.</p>
      <p>The World Wide Web, the cornerstone of modern information exchange and communication, operates on a structured protocol known as HTTP, or Hypertext Transfer Protocol. At its core, HTTP is the language that web browsers and servers use to converse with each other, enabling the seamless retrieval and delivery of web content. While most of us interact with the web daily, the inner workings of HTTP methods and their significance remain a mystery to many.</p>
    
      <p>In this chapter, we'll discuss the essential components of HTTP, with a primary focus on the pivotal role played by HTTP methods. Understanding these methods is not only crucial for web developers and programmers but also for technical writers looking to comprehend how data flows across the internet.</p>
    
      <h2>The Common HTTP Methods</h2>
      <p>HTTP methods, often referred to as HTTP verbs, are fundamental to the functioning of the World Wide Web. They define the actions that can be performed on resources, allowing clients (such as web browsers or applications) to communicate with servers in a structured manner. These methods are so crucial that they are often collectively referred to as CRUD operations, representing Create, Read, Update, and Delete actions on resources.</p>
    
      <img src="{{ "/assets/images/http_methods.jpg" | relative_url }}" alt="Top 9 HTTP Request Methods" width="100%" title="Top 9 HTTP Request Methods">
    
      <div class="api-method-card get">
        <h4>GET method</h4>
        <ul>
          <li><strong>Request:</strong> A GET request is used to retrieve data from the server. It typically doesn't have a request body, as it's meant for read-only operations. Any data needed for the request is usually sent as query parameters in the URL.</li>
          <li><strong>Response:</strong> The response to a GET request contains the requested data. It may have a response body, such as JSON or HTML, depending on the resource being fetched.</li>
        </ul>
      </div>
    
      <div class="api-method-card post">
        <h4>POST method</h4>
        <ul>
          <li><strong>Request:</strong> A POST request is used to create a new resource on the server. It typically has a request body that contains data for the new resource.</li>
          <li><strong>Response:</strong> The response to a POST request often includes information about the newly created resource. It may have a response body containing the ID or other details of the created resource.</li>
        </ul>
      </div>
    
      <div class="api-method-card put">
        <h4>PUT method</h4>
        <ul>
          <li><strong>Request:</strong> A PUT request is used to update an existing resource on the server. It typically has a request body that contains the complete updated representation of the resource.</li>
          <li><strong>Response:</strong> The response to a PUT request often confirms the successful update and may include information about the updated resource.</li>
        </ul>
      </div>
    
      <div class="api-method-card patch">
        <h4>PATCH method</h4>
        <ul>
          <li><strong>Request:</strong> A PATCH request is used to partially update an existing resource. It has a request body that contains a partial representation of the resource, indicating specific changes.</li>
          <li><strong>Response:</strong> The response to a PATCH request confirms the successful partial update.</li>
        </ul>
      </div>
    
      <div class="api-method-card delete">
        <h4>DELETE method</h4>
        <ul>
          <li><strong>Request:</strong> A DELETE request is used to request the removal of a resource from the server. It typically doesn't have a request body, as it's focused on resource deletion based on the URL.</li>
          <li><strong>Response:</strong> The response to a DELETE request confirms the successful deletion.</li>
        </ul>
      </div>
    
      <h3>Other HTTP Methods:</h3>
      <p>While the five primary HTTP methods (GET, POST, PUT, PATCH, DELETE) cover the majority of use cases in web development and API design, there are several other HTTP methods that serve specialized purposes. These less commonly used methods are valuable tools in specific scenarios.</p>
      
      <ol>
        <li>
          <strong>HEAD Method</strong>
          <p><strong>Purpose:</strong> The HEAD method is similar to GET but without the response body. It is used to retrieve only the headers of a resource, providing metadata about the resource, such as its content type and length.</p>
          <p>The HEAD method is useful for checking resource availability or obtaining metadata without downloading the entire content.</p>
        </li>
    
        <li>
          <strong>OPTIONS Method</strong>
          <p><strong>Purpose:</strong> The OPTIONS method is used to request information about the communication options available for a resource. It retrieves details about the supported HTTP methods, headers, and other capabilities of the server.</p>
          <p>The OPTIONS method helps clients understand what actions they can perform on a resource.</p>
        </li>
    
        <li>
          <strong>TRACE Method</strong>
          <p><strong>Purpose:</strong> The TRACE method is primarily used for diagnostic purposes. It echoes the received request back to the client, allowing it to see how the request was modified by intermediaries (such as proxies or load balancers).</p>
          <p>TRACE can help in debugging and understanding the request-response flow.</p>
        </li>
    
        <li>
          <strong>CONNECT Method</strong>
          <p><strong>Purpose:</strong> The CONNECT method is used to establish a network connection to a resource, typically through a proxy server. It is often used for creating secure tunnels for encrypted communication, such as HTTPS.</p>
          <p>CONNECT is mainly used for setting up secure connections through proxy servers.</p>
        </li>
      </ol>
    
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
        <div class="question-box-header">
          <div class="icon"><i class="fas fa-lightbulb"></i></div>
          <button class="question-toggle">
            <span>Questions to Explore on HTTP Protocols</span>
            <span class="toggle-icon">↓</span>
          </button>
        </div>
        <div class="question-box-content">
          <ul class="questions-list">
            <li class="question-item">What is the purpose of the HTTP GET method?</li>
            <li class="question-item">When is the HTTP POST method typically used?</li>
            <li class="question-item">How does the HTTP PUT method differ from the PATCH method?</li>
            <li class="question-item">What HTTP method is used for resource deletion?</li>
            <li class="question-item">Where can you find the protocol in a URL?</li>
            <li class="question-item">What is the significance of the protocol keyword in a URL?</li>
            <li class="question-item">How do HTTP and HTTPS protocols differ in terms of security?</li>
            <li class="question-item">What does it mean when a URL starts with "https://"?</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div id="domain" class="url-tab-content">
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
    
      <p>For example, the following URL shows the domain of the Google Search API:</p>
      <pre><code>https://developers.google.com/search/</code></pre>
    
      <p>The domain of the Google Search API is <code>developers.google.com</code>. This is the server that hosts the API, and it is the server that you need to send requests to in order to use the API.</p>
    
      <div class="question-box">
        <div class="question-box-header">
          <div class="icon"><i class="fas fa-lightbulb"></i></div>
          <button class="question-toggle">
            <span>Questions to Explore on Domain Names</span>
            <span class="toggle-icon">↓</span>
          </button>
        </div>
        <div class="question-box-content">
          <ul class="questions-list questions-list-grid">
            <li class="question-item">What exactly is a domain name, and how does it relate to a website's internet address?</li>
            <li class="question-item">Why is the domain name often referred to as the website's URL?</li>
            <li class="question-item">What is the difference between a top-level domain (TLD) and a second-level domain (SLD)?</li>
            <li class="question-item">Can you give examples of common TLDs and SLDs?</li>
            <li class="question-item">When you enter a domain in your browser, what happens behind the scenes to locate the website?</li>
            <li class="question-item">What is the role of the DNS (Domain Name System) server in the process?</li>
            <li class="question-item">How does the DNS server find the IP address associated with a domain name?</li>
            <li class="question-item">Why is the IP address crucial for your browser to connect to the website's server?</li>
            <li class="question-item">Why are domains important in the context of API documentation?</li>
            <li class="question-item">How does knowing the domain of an API server help you when using an API?</li>
            <li class="question-item">Can you identify the domain in a given API URL, and why is it essential to do so?</li>
            <li class="question-item">What role does the API server's domain play in sending requests and receiving API responses?</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div id="path" class="url-tab-content">
      <!-- Content for Path tab -->
      <h2>Path</h2>
      <p>In our example URL, the path is <code>/search</code>.</p>
      <p>The path of a URL is the part of the URL that identifies the specific resource that is being accessed.</p>
    
      <p>Paths can be simple or complex. They can be static or dynamic. Static paths are always the same, while dynamic paths can vary depending on the resource that is being accessed.</p>
    
      <h3>How do paths work?</h3>
      <p>Imagine you're using your web browser to search for adorable cat videos on Google. You type in your query, hit the search button, and magically, a list of cat videos appears on your screen. Ever wondered how this happens behind the scenes? It's all about how the web and APIs (Application Programming Interfaces) work together.</p>
    
      <p>When you, the client, send a request to an API, you provide a URL, and the path within that URL is like a GPS coordinate for the data you want to access. Think of it as the address to your desired resource.</p>
    
      <p>For instance, consider the URL: <code>https://www.google.com/search?q=cats</code>. In this case, the path is <code>/search</code>. This path serves as a set of instructions for Google's Search API server. It tells the server that you're on the hunt for information about "cats."</p>
    
      <p>Now, the API server, like a diligent librarian, takes this path and scours its vast database for everything related to "cats." It gathers up a list of cat-related websites, images, and videos, and bundles them all up into a neat package. Finally, it sends this treasure trove of cat content back to your browser, which then displays it on your screen.</p>
    
      <p>So, in a nutshell, when you send a request to an API, the path in the URL guides the API server to the right shelf in its digital library, where it fetches the data you desire and delivers it to your device, making your quest for cat videos as smooth as a purring kitten's fur.</p>
    
      <h3>Paths in API documentation</h3>
      <p>Paths are important in API documentation because they tell technical writers how to access the resources that are provided by the API. When writing API documentation, technical writers should clearly document the paths of all of the resources that are provided by the API.</p>
    
      <p>For example, the following API documentation for the Google Search API shows the path of the resource that is used to search for a term:</p>
    
      <pre><code>GET /search?q={query}</code></pre>
    
      <p>The path of this resource is <code>/search</code>, where <code>{query}</code> is a placeholder for the term that the user wants to search for.</p>
    
      <h3>How to Identify a Path in a URL?</h3>
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
        <div class="question-box-header">
          <div class="icon"><i class="fas fa-lightbulb"></i></div>
          <button class="question-toggle">
            <span>Questions to Explore on URL Paths</span>
            <span class="toggle-icon">↓</span>
          </button>
        </div>
        <div class="question-box-content">
          <ul class="questions-list">
            <li class="question-item">Where does the path start in a URL?</li>
            <li class="question-item">What information does the path component typically contain?</li>
            <li class="question-item">What specific resource or content does the path point to?</li>
            <li class="question-item">How does the path hierarchy relate to the website's structure?</li>
            <li class="question-item">Do any segments in the path indicate user categories or content types?</li>
            <li class="question-item">Is there a pattern in the path that conveys information about the resource?</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div id="query" class="url-tab-content">
        <!-- Content for Query Parameters tab -->
    <h2>Query Parameters in URLs</h2>
    <p>In our example URL, the query parameter is: <code>q=cats</code>.</p>
    <p>Query parameters are key-value pairs in a URL that provide additional information to the web server when performing an HTTP request. They are often used in online applications and APIs to send data from the client to the server (typically a web browser or application). The query parameters are separated from the basic URL by a question mark ('?'), whereas they are divided by ampersands ('&').</p>
    
    <h3>How to recognize Query Parameters</h3>
    <ul>
    <li><strong>Look for the Question Mark ('?'):</strong> Query parameters are typically introduced in a URL using a question mark ('?'). This question mark separates the base URL from the query parameters. For example: <code>https://example.com/search?query=term</code> In this URL, the question mark "?" indicates the start of the query parameters.</li>
    
    <li><strong>Identify Key-Value Pairs:</strong> Query parameters are made up of key-value pairs, in which a key is linked to a value using the equal symbol ('='). Ampersands ('&') separate multiple key-value pairs. For instance, go to <code>https://example.com/search?query=term&category=books</code>. There are two key-value pairs in this URL: <code>query=term</code> and <code>category=books</code>.</li>
    
    <li><strong>Recognize Keys and Values:</strong> The key is the name or identifier of the parameter, and the value is the data associated with that key. In the example above, "query" is the key, and "term" is the value.</li>
    
    <li><strong>Handle Special Characters:</strong> Be aware that both keys and values in query parameters may need to be URL-encoded if they contain special characters or spaces. URL encoding replaces special characters with percent-encoded representations.</li>
    
    <li><strong>Additional Query Parameters:</strong> If there are multiple query parameters, they are separated by ampersands ('&'). For example: <code>https://example.com/search?query=term&category=books&sort=asc</code> In this URL, there are three query parameters: "query=term," "category=books," and "sort=asc."</li>
    
    <li><strong>Query Parameter Order:</strong> The order of query parameters in the URL generally does not matter, as web servers and applications should be able to interpret them correctly regardless of their order.</li>
    
    <li><strong>Repeating Query Parameters:</strong> Query parameters can be repeated multiple times in a URL, separated by ampersands ('&'). This is useful for cases where you need to pass multiple values for the same parameter. For example, the following URL uses multiple query parameters to filter the results of a search: <code>https://example.com/search?q=cats&category=books&category=movies</code> In this example, the category query parameter is repeated twice, with different values for each repetition. This tells the web server to only return results that are both about cats and are either books or movies.</li>
    </ul>
    
    <p>Query parameters are a powerful tool for passing data to web servers and APIs. By understanding how to document query parameters, you can develop effective and error-free documentation.</p>
    
    <div class="question-box">
      <div class="question-box-header">
        <div class="icon"><i class="fas fa-lightbulb"></i></div>
        <button class="question-toggle">
          <span>Questions to Explore on Query Parameters</span>
          <span class="toggle-icon">↓</span>
        </button>
      </div>
      <div class="question-box-content">
        <ul class="questions-list">
          <li class="question-item">What are query parameters and what is their purpose in a URL?</li>
          <li class="question-item">How are query parameters separated from the base URL?</li>
          <li class="question-item">What symbol is used to introduce query parameters in a URL?</li>
          <li class="question-item">Explain the structure of a key-value pair in query parameters.</li>
          <li class="question-item">Why might you need to URL-encode query parameters?</li>
          <li class="question-item">How are multiple query parameters separated from each other in a URL?</li>
          <li class="question-item">What is the purpose of a fragment identifier in a URL, and how is it different from query parameters?</li>
          <li class="question-item">Does the order of query parameters in a URL matter for interpretation?</li>
          <li class="question-item">When and why would you repeat a query parameter with different values in a URL?</li>
          <li class="question-item">What is the role of query parameters in passing data to web servers and APIs?</li>
        </ul>
      </div>
    </div>
    
    </div>
    
    <div id="fragment" class="url-tab-content">
      <!-- Content for Fragment Identifiers tab -->
    <h2>Fragment Identifiers in URLs</h2>
    <p>In our example URL, the fragment identifier is: <code>my-fragment</code>.</p>
    <p>Fragment identifiers are a way to identify a specific location within a web page or other resource. They are typically used to link to specific sections of a web page or to provide deep links to specific resources. Fragment identifiers are indicated by a hash sign (#) followed by a unique identifier. For example, the following URL uses a fragment identifier to link to the "Introduction" section of a web page: <code>https://example.com/my-page#Introduction</code></p>
    
    <p>When a user clicks on a link to a fragment identifier, their browser will scroll to the specified location within the resource.</p>
    
    <h3>How to Identify a Fragment Identifier</h3>
    <p>To identify a fragment identifier in a URL, look for the hash sign (#) followed by a unique identifier. The fragment identifier is everything after the hash sign, but it does not include the hash sign itself. For example, in the following URL, the fragment identifier is "myjob": <code>https://example.com/my-page#myjob</code></p>
    
    <p>Fragment identifiers are a useful way to make your web pages and API documentation more user-friendly and informative. By understanding how to identify and use fragment identifiers, you can help your users find the information they need quickly and easily.</p>
    
    <div class="question-box">
        <div class="question-box-header">
          <div class="icon"><i class="fas fa-lightbulb"></i></div>
          <button class="question-toggle">
            <span>Questions to Explore on Fragment Identifiers</span>
            <span class="toggle-icon">↓</span>
          </button>
        </div>
        <div class="question-box-content">
          <ul class="questions-list">
            <li class="question-item">What is a fragment identifier in a URL, and what is its purpose?</li>
            <li class="question-item">How is a fragment identifier indicated in a URL?</li>
            <li class="question-item">What is the significance of the hash sign (#) in a fragment identifier?</li>
            <li class="question-item">How can fragment identifiers enhance user experience on web pages?</li>
            <li class="question-item">Is it possible to have both query parameters and a fragment identifier in the same URL?</li>
            <li class="question-item">How can you identify a fragment identifier within a URL?</li>
          </ul>
        </div>
    </div>
    
    </div>
  </div>

  <div class="chapter-section">
  <p>The above URL has the following components, and we document all of them if present:</p>
  
  <ul>
    <li>Protocol: <code>https://</code></li>
    <li>Domain name: <code>www.google.com</code></li>
    <li>Path: <code>/search</code></li>
    <li>Query parameters: <code>q=cats</code></li>
    <li>Fragment identifier: <code>my-fragment</code></li>
  </ul>
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


<div class="chapter-section">
  <h2 id="chapter-summary">Chapter Summary</h2>
  
  <div class="chapter-takeaways">
    <h3 class="chapter-takeaways-header">Key Takeaways</h3>
    <div class="chapter-takeaways-content">
      <ul class="chapter-takeaways-list">
        <li>A URL consists of several components: protocol, domain name, path, query parameters, and fragment identifiers.</li>
        <li>The protocol (e.g., http://, https://) specifies how browsers should communicate with web servers.</li>
        <li>Domain names (e.g., www.google.com) identify the server hosting the resource.</li>
        <li>Paths (e.g., /search) identify specific resources on the server.</li>
        <li>Query parameters (e.g., ?q=cats) provide additional information to refine requests.</li>
        <li>Fragment identifiers (e.g., #section1) link to specific sections within a resource.</li>
        <li>HTTP methods (GET, POST, PUT, DELETE, PATCH) define the actions that can be performed on resources.</li>
        <li>Understanding URL components is essential for effective API documentation.</li>
      </ul>
    </div>
  </div>
</div>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    // Tab functionality for URL anatomy
    const tabButtons = document.querySelectorAll('.url-tab-button');
    const tabContents = document.querySelectorAll('.url-tab-content');
    const urlParts = document.querySelectorAll('.url-part');
    const urlSpans = document.querySelectorAll('.url-string span');
    
    function activateTab(tabName) {
      // Hide all content
      tabContents.forEach(content => {
        content.classList.remove('active');
      });
      
      // Deactivate all buttons
      tabButtons.forEach(button => {
        button.classList.remove('active');
      });
      
      // Remove highlight from URL parts
      urlSpans.forEach(span => {
        span.classList.remove('highlight');
      });
      
      // Show the selected content
      document.getElementById(tabName).classList.add('active');
      
      // Activate the matching button
      document.querySelector(`.url-tab-button[data-tab="${tabName}"]`).classList.add('active');
      
      // Highlight the corresponding URL part
      document.querySelector(`.${tabName}-part`).classList.add('highlight');
    }
    
    // Add click events to tab buttons
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        activateTab(tabName);
      });
    });
    
    // Add click events to URL parts
    urlParts.forEach(part => {
      part.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        activateTab(tabName);
      });
    });
    
    // Activate Protocol tab by default
    activateTab('protocol');
  });
</script>