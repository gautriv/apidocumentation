---
title: Types of APIs - A Complete Overview
description: Discover the different types of APIs including REST, SOAP, GraphQL, WebSockets, JSON-RPC, XML-RPC, and gRPC. Learn how each API type works, their key features, and when to use them in your projects.
keywords: types of APIs, REST API, SOAP API, GraphQL API, WebSocket API, JSON-RPC API, XML-RPC API, gRPC API, web service APIs, library-based APIs, class-based APIs, API comparison, API technologies, modern API types, API integration, API documentation, API architecture, API protocols, real-time APIs, microservice APIs, API communication patterns, API development, RESTful web services, API design patterns
permalink: typesofAPI.html
summary: "Here I introduce the different types of APIs, including REST APIs, SOAP APIs, GraphQL, WebSockets, JSON-RPC, XML-RPC, and gRPC. It explains each type of API in a simple and easy-to-understand way, using analogies and examples. The article also discusses the applications of each type of API."
next_page:
  url: /restAPI.html
  title: "More on REST APIs"
previous_page:
  url: /informationgathering.html
  title: "How do Technical Writers document?"
---

Now that you know what we document and how we document, it's time to explore the diverse world of APIs, and I'll explain them in a way that's easy to grasp.

We've six broad categories of APIs:

1. **Web service APIs:** These are like the superheroes of the internet. They help all sorts of websites and apps talk to each other. Some cool ones are REST, SOAP, GraphQL, and more.

2. **Library-based APIs:** Think of these as ready-made toolboxes for programmers. They come with handy tools (functions or classes) for doing specific jobs, like building stuff in a video game.

3. **Class-based APIs (Object-Oriented):** These are like special toolboxes that organize their tools in a very neat and organized way, just like how your toys might be sorted into different boxes.

4. **Functions or routines in an OS:** The operating system (the boss of your computer) shares some secret codes with programmers. These codes help programs use the computer's special powers.

5. **Object remoting APIs:** Imagine if you could send messages to your friends using magic spells. Object remoting APIs are like those spells, making objects in different places talk to each other.

6. **Hardware APIs:** These are the keys to unlock the superpowers of your computer's hardware, like the graphics card or the sound system.

In this tutorial, we are more interested in understanding Web service APIs. Why? Because 80-90% of the time, you are going to document Web service APIs only.

<img src="./assets/gif/webAPIs.gif" alt="Different types of Web APIs including REST, SOAP, GraphQL, and WebSockets" title="Web API types and their relationships">

The Web service API encompasses:

* REST API
* SOAP API
* GraphQL
* WebSockets
* JSON-RPC
* XML-RPC
* gRPC

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

## REST API (Representational State Transfer)

So, first up, we have the REST API. Imagine it as the simplest way to design apps that talk to each other over the internet. It's like going to a restaurant with a menu. You pick what you want (using simple commands like GET, POST, PUT, or DELETE), and the kitchen (the server) gets it ready and serves it to you. REST is known for being straightforward, scalable, and it works with pretty much anything on the web.


## SOAP API (Simple Object Access Protocol)

Next, we've got the SOAP API. This one is a bit like sending letters, but with strict rules. Everything has to be in a specific order and format, just like how you need to write an address on an envelope in a particular way. SOAP is all about strong security and reliability, making sure your message gets to the right place.


## GraphQL

Now, let's talk about GraphQL. It's like ordering a customised pizza. You get to choose exactly what toppings you want, and you won't get anything else. With GraphQL, you request just the data you need in a single go. It's super flexible and efficient, especially when you don't want to waste time or data.

## WebSocket

Moving on to WebSockets. These are like having a phone call where you can talk and listen at the same time. It's different from traditional mail (like sending letters) or email (where you send a message and wait for a response). WebSockets are great for real-time stuff like chatting and live updates.

## JSON-RPC and XML-RPC

Now, let's talk about JSON-RPC and XML-RPC. These are like asking a friend to do something specific for you, and your friend knows exactly what you want. It's a way for one program to request a particular action from another program. These types are handy because they can work with different programming languages, making them a good choice for big, distributed systems.

## gRPC

Last but not least, gRPC. Think of gRPC like sending a super efficient and structured letter with a built-in translator. It makes sure both the sender and the receiver understand each other perfectly. gRPC is known for high performance and strong typing, which means it's fast and reliable.

Intrigued by the fascinating world of APIs? Well, guess what? There's more to explore in the next chapter, where we dive deeper into the **superstar of APIs** - [REST APIs]({{ '/restAPI.html' | relative_url }}). Get ready for an exciting journey into its intricacies and applications. Stay tuned, and let's unravel the secrets together!

{% include enhanced_note.html 
  title="API Selection Tip" 
  type="info" 
  content="When choosing an API type for your project, consider factors like data complexity (GraphQL for complex data needs), real-time requirements (WebSockets for live updates), enterprise needs (SOAP for strict security), or simplicity (REST for most web applications)."
%}

{% include key_takeaways.html content="
<ul>
  <li>There are six broad categories of APIs, with web service APIs being the most commonly documented</li>
  <li>Web service APIs include REST, SOAP, GraphQL, WebSockets, JSON-RPC, XML-RPC, and gRPC</li>
  <li>REST APIs use simple HTTP methods and are known for being straightforward and scalable</li>
  <li>SOAP APIs follow strict protocols for reliable message exchange</li>
  <li>GraphQL allows clients to request exactly the data they need in a single query</li>
  <li>WebSockets enable real-time, bidirectional communication</li>
  <li>As a technical writer, you'll primarily focus on documenting web service APIs (80-90% of API documentation)</li>
</ul>
" %}