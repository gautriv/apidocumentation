---
layout: chapter
title: "Types of APIs"
description: "Explore the different categories of APIs with a focus on Web service APIs including REST, SOAP, GraphQL, and more."
module_id: "rest-apis"
module_title: "REST API Documentation"
chapter_number: 1
permalink: /typesofAPI.html
next_chapter: "/restAPI.html"
next_title: "More on REST APIs"
module_chapters:
  - number: 1
    title: "Types of APIs"
    url: "/typesofAPI.html"
  - number: 2
    title: "More on REST APIs"
    url: "/restAPI.html"
resources:
  - title: "API Comparison Guide"
    url: "#"
  - title: "Web API Standards"
    url: "#"
---

<div class="chapter-section">
  <h2 id="api-categories">Categories of APIs</h2>
  
  <p class="intro-text">Now that you know what we document and how we document, it's time to explore the diverse world of APIs, and I'll explain them in a way that's easy to grasp.</p>
  
  <div class="info-box">
    <h3>What are APIs again?</h3>
    <p>Remember, an API (Application Programming Interface) is a set of rules that allows different software applications to communicate with each other. Think of it as a waiter in a restaurant - taking your order to the kitchen and bringing back your food!</p>
  </div>
  
  <h3>The Six Categories of APIs</h3>
  
  <div class="card-container">
    <div class="api-card">
      <div class="card-icon"><i class="fas fa-globe"></i></div>
      <h4>Web service APIs</h4>
      <p>The superheroes of the internet! They help websites and apps talk to each other. Examples include REST, SOAP, GraphQL, and more.</p>
    </div>
    
    <div class="api-card">
      <div class="card-icon"><i class="fas fa-toolbox"></i></div>
      <h4>Library-based APIs</h4>
      <p>Ready-made toolboxes for programmers with handy functions or classes for specific tasks, like building features in a video game.</p>
    </div>
    
    <div class="api-card">
      <div class="card-icon"><i class="fas fa-boxes"></i></div>
      <h4>Class-based APIs</h4>
      <p>Special toolboxes that organize their tools in a neat and organized way, just like sorting toys into different boxes.</p>
    </div>
    
    <div class="api-card">
      <div class="card-icon"><i class="fas fa-desktop"></i></div>
      <h4>OS Functions/Routines</h4>
      <p>Secret codes shared by the operating system with programmers, helping programs use the computer's special powers.</p>
    </div>
    
    <div class="api-card">
      <div class="card-icon"><i class="fas fa-magic"></i></div>
      <h4>Object remoting APIs</h4>
      <p>Like magic spells that let you send messages to friends, these make objects in different places talk to each other.</p>
    </div>
    
    <div class="api-card">
      <div class="card-icon"><i class="fas fa-microchip"></i></div>
      <h4>Hardware APIs</h4>
      <p>Keys that unlock the superpowers of your computer's hardware, like the graphics card or sound system.</p>
    </div>
  </div>
  
  <div class="highlight-box">
    <h3>Why Focus on Web Service APIs?</h3>
    <p>As technical writers, we focus on Web service APIs because <strong>80-90% of the time</strong>, these are the APIs you'll be documenting in your career.</p>
  </div>
  
  <div class="image-container">
    <img src="{{ "/assets/gif/webAPIs.gif" | relative_url }}" alt="Web APIs" class="featured-image">
    <p class="image-caption">The interactions between different types of Web APIs</p>
  </div>
</div>

<div class="chapter-section">
  <h2 id="web-apis">The Web Service API Family</h2>
  
  <p>Let's explore the different members of the Web service API family:</p>
  
  <div class="api-types-container">
    <div class="api-type">
      <h3 id="rest-api">REST API</h3>
      <div class="api-type-content">
        <div class="api-type-icon"><i class="fas fa-exchange-alt"></i></div>
        <div class="api-type-description">
          <p>Imagine REST as the simplest way to design apps that talk to each other over the internet. It's like going to a restaurant with a menu:</p>
          <ul>
            <li>You pick what you want (using commands like GET, POST, PUT, DELETE)</li>
            <li>The kitchen (server) prepares and serves your order</li>
            <li>It's straightforward, scalable, and works with almost anything on the web</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="api-type">
      <h3 id="soap-api">SOAP API</h3>
      <div class="api-type-content">
        <div class="api-type-icon"><i class="fas fa-envelope"></i></div>
        <div class="api-type-description">
          <p>Think of SOAP like sending letters with strict rules:</p>
          <ul>
            <li>Everything has to be in a specific format</li>
            <li>Like writing an address on an envelope in a particular way</li>
            <li>Provides strong security and reliability</li>
            <li>Ensures your message gets to the right place</li>
          </ul>
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
    
    <div class="api-type">
      <h3 id="graphql">GraphQL</h3>
      <div class="api-type-content">
        <div class="api-type-icon"><i class="fas fa-pizza-slice"></i></div>
        <div class="api-type-description">
          <p>GraphQL is like ordering a customized pizza:</p>
          <ul>
            <li>You choose exactly which toppings you want</li>
            <li>You get only what you asked for - nothing more, nothing less</li>
            <li>Request just the data you need in a single go</li>
            <li>Super flexible and efficient when you don't want to waste resources</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="api-type">
      <h3 id="websocket">WebSocket</h3>
      <div class="api-type-content">
        <div class="api-type-icon"><i class="fas fa-phone-alt"></i></div>
        <div class="api-type-description">
          <p>WebSockets are like having a phone call:</p>
          <ul>
            <li>You can talk and listen at the same time</li>
            <li>Different from traditional mail or email where you send and wait</li>
            <li>Perfect for real-time applications like chat apps and live updates</li>
            <li>Maintains an open connection for continuous communication</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="api-type">
      <h3 id="rpc">JSON-RPC and XML-RPC</h3>
      <div class="api-type-content">
        <div class="api-type-icon"><i class="fas fa-tasks"></i></div>
        <div class="api-type-description">
          <p>Think of these like asking a friend to do something specific:</p>
          <ul>
            <li>Your friend knows exactly what you want</li>
            <li>One program requests a specific action from another program</li>
            <li>Works with different programming languages</li>
            <li>Great for big, distributed systems</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="api-type">
      <h3 id="grpc">gRPC</h3>
      <div class="api-type-content">
        <div class="api-type-icon"><i class="fas fa-bolt"></i></div>
        <div class="api-type-description">
          <p>gRPC is like sending a super efficient letter with a built-in translator:</p>
          <ul>
            <li>Both sender and receiver understand each other perfectly</li>
            <li>Known for high performance and strong typing</li>
            <li>Fast and reliable communication</li>
            <li>Efficient binary protocol instead of text-based formats</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  
  <div class="next-chapter-teaser">
    <h3>What's Coming Next?</h3>
    <p>Intrigued by the fascinating world of APIs? Well, guess what? There's more to explore in the next chapter, where we dive deeper into the <strong>superstar of APIs</strong>. Get ready for an exciting journey into its intricacies and applications. Stay tuned, and let's unravel the secrets together!</p>
  </div>
</div>

<div class="chapter-section">
  <h2 id="chapter-summary">Chapter Summary</h2>
  
  <div class="chapter-takeaways">
    <h3 class="chapter-takeaways-header">Key Takeaways</h3>
    <div class="chapter-takeaways-content">
      <ul class="chapter-takeaways-list">
        <li>There are six broad categories of APIs, each serving different purposes.</li>
        <li>Web service APIs are the most commonly documented (80-90% of API documentation work).</li>
        <li>The Web service API family includes REST, SOAP, GraphQL, WebSockets, JSON-RPC, XML-RPC, and gRPC.</li>
        <li>Each API type has its own strengths and ideal use cases.</li>
      </ul>
    </div>
  </div>
</div> 