---
title: REST APIs Key Concepts and Structure
description: Learn about REST APIs, the superstar of web APIs. Explore key concepts like statelessness and caching, and understand the three main components of REST APIs - URL endpoints, HTTP verbs, and body messages - with real-world examples.
keywords: REST API, RESTful API, REST architecture, statelessness in REST, REST API caching, REST API documentation, API endpoints, HTTP verbs, API request body, REST vs SOAP, RESTful web services, API URL structure, REST API examples, REST API components, GET request, POST request, DELETE request, PUT request, PATCH request, JSON in REST API, REST API best practices, stateless API design, REST API authentication, API design patterns, REST API response codes
permalink: restAPI.html
summary: "This module introduces REST APIs, a popular type of API that uses simple web addresses to help you find and get information from the internet. It covers the concepts of statelessness and caching, and how they are used in REST APIs. The module also provides examples of how REST APIs are used in real-world applications."
next_page:
  url: /anatomyofurl.html
  title: "Anatomy of a URL"
previous_page:
  url: /typesofAPI.html
  title: "Types of APIs"
---

{% include trivia.html 
  type="tech" 
  icon="fa-star" 
  title="Did you know we have an API that's a superstar among APIs?"
%}

Okay, so there's this one type of API that's like the superstar of the tech world, and it's called a *REST API.* You must understand it as it'll help you documenting APIs a lot better.

Let me break it down for you.

Imagine you have a massive library with tons of books, each with a label on its spine. Now, if you want a specific book, what do you do? You check the label, find the right shelf, and grab it, right? Well, REST APIs work kinda like that. Instead of books and labels, they use simple web addresses to help you find and get information from the internet. The cool thing is, they're super popular because they're as easy to use as finding a book in a perfectly organized library.

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

## Statelessness: The Core Principle of REST APIs

REST APIs are designed to be stateless. This means that each interaction or request between a client (like a web browser) and a server (which hosts the API) is independent. In other words, the server doesn't retain any information about previous requests from the same client.

Here's an analogy to help you understand statelessness. Imagine you're at an all-you-can-eat buffet. You grab a plate, load it up with food, eat, and when you're done, you return your plate. But guess what? The buffet doesn't remember you or what you ate before. Every time you come back, it's like you're starting over.

That's just like REST. Every time your browser talks to a web server, it's like a new conversation. The server doesn't remember what you did before. This makes things super efficient and straightforward.

## Caching in REST APIs: Boosting Performance

Caching is another important concept in REST. Caching is when the server stores a copy of a resource in memory so that it doesn't have to fetch it from the database every time someone requests it. This can improve performance significantly, especially for frequently requested resources.

Here's an example of caching in REST. Let's say you're reading a news article online. When you click on the article, your browser asks the server for the article, and the server sends it over. The server then stores a copy of the article in its cache.

The next time someone asks for the same article, the server can simply send them the cached copy, without having to fetch it from the database again. This saves time and resources, and it also makes the website feel more responsive.

### Real-World Applications of REST Principles

Here are some examples of how statelessness and caching are used in REST APIs:

* When you log in to a website, the server doesn't remember you after you close your browser. This is because REST APIs are stateless.

* When you add an item to your shopping cart on an e-commerce website, the server stores the item in your cart's cache. This means that you don't have to add the item to your cart again if you come back to the website later.

* When you search for a product on an e-commerce website, the server stores the results of your search in its cache. This means that other people who search for the same product will see the same results, even if they search at a different time.

## Do you know the basic structure of a REST API?

Okay, so a REST API has three main components. But before I explain these components, let me tell you that it's perfectly okay if you are encountering these terms for the first time. In this tutorial, I've made sure that you get to know everything in detail. What I've explained here is just a gist; I've covered everything in detail.

Why have I provided a gist? It's important because I'm explaining REST API here, and it's crucial to include all the related information, even if it's just a summary.

Enough of the monologue. Let's get back to the topic.

So, a REST API has three main components:

1. URL Endpoints
2. HTTP Verb
3. Body (JSON or XML)

<img src="./assets/gif/RESTAPI.gif" alt="REST API structure showing endpoints, HTTP verbs, and body messages" title="The three main components of a REST API: URL endpoints, HTTP verbs, and body messages">

### URL Endpoints in REST APIs

Think of URL endpoints as magical addresses on the internet. They're like secret codes that lead you to different parts of a digital library. Imagine you're in a giant library full of all sorts of books. Each URL endpoint is like a signpost that tells you where to go:

- `/library` might lead to the general library section.
- `/library/fantasy` could take you to the enchanting world of fantasy books.
- `/library/science` opens the door to the scientific treasures of your library.

These URL endpoints are like magical portals, guiding you to the knowledge you seek.

### HTTP Verbs: Actions in REST APIs

Now, imagine you're the librarian in this magical library. You have different actions you can take, just like the library's HTTP verbs. Here are some librarian actions that match up with HTTP verbs:

- **GET**: When a visitor wants to read a book, you use the GET action. For instance, a request to `/library/fantasy` with a GET verb would allow them to peruse your collection of fantasy books.

- **POST**: If someone brings a new, enchanted book to your library, you use the POST action to add it to the appropriate section. It's like cataloging a new book for your collection.

- **DELETE**: Sometimes, a book must be removed from the library. With DELETE, you can make a book vanish from your shelves, ensuring it's no longer accessible.

- **PUT**: When a visitor wants to update a book's details (perhaps correcting a typo in the title), you employ the PUT action. It's like magically rewriting the book's cover.

- **PATCH**: Occasionally, you may need to make minor changes to a book's description or author details. This is where PATCH comes in handy, allowing you to tweak specific parts of a book's information.

Just like a librarian manages a physical library's books, you, as a developer, control the digital library's resources using these HTTP verbs.

### Body Messages: The Content of REST Requests

In our library, visitors occasionally come bearing special requests. These requests are like the request body in an HTTP request. For example, a visitor may approach you with a request to add a new fantasy book with specific details. This request body contains the book's information, such as its title, author, and genre.

*Request:*
<pre>
<code>
GET http://example.com/library/books/123
</code>
</pre>

*Response:*
<pre>
<code>
// HTTP status code: 200
{
  "book_id": 123,
  "title": "The Hitchhiker's Guide to the Galaxy",
  "author": "Douglas Adams",
  "genre": "Science Fiction",
  "available": true
}
</code>
</pre>

As promised, in our [upcoming chapter on URL anatomy]({{ '/anatomyofurl.html' | relative_url }}), we're diving deep into the world of Endpoints, HTTP verbs, and the intriguing concept of Request Bodies. Discover how these fundamental elements shape the way we interact with APIs and unlock the true power of web communication. Stay tuned for a thrilling exploration that will take your API knowledge to the next level!

{% include trivia.html 
  type="mind-blowing" 
  icon="fa-bolt" 
  title="REST Architecture Trivia" 
  content="The term REST was coined by Roy Fielding in his 2000 PhD dissertation. REST wasn't designed for the web we know today but has become so fundamental that it's hard to imagine the web without it. While most developers use REST daily, fewer than 1% of implementations fully comply with all six of Fielding's original architectural constraints!"
%}

{% include enhanced_note.html 
  title="REST API Best Practice" 
  type="success" 
  content="When designing REST APIs, remember to use nouns instead of verbs in your endpoints (e.g., use '/books' instead of '/getBooks'), utilize HTTP methods appropriately, and maintain consistent response structures to create intuitive, developer-friendly APIs."
%}

{% include key_takeaways.html content="
<ul>
  <li>REST APIs are the most popular type of web API due to their simplicity and efficiency</li>
  <li>Statelessness means each request to a REST API is independent, with the server maintaining no memory of previous interactions</li>
  <li>Caching improves performance by storing frequently accessed resources for quicker retrieval</li>
  <li>REST APIs have three main components: URL endpoints, HTTP verbs, and body messages</li>
  <li>URL endpoints act as addresses to specific resources in your API</li>
  <li>HTTP verbs (GET, POST, PUT, DELETE, PATCH) define the actions that can be performed on resources</li>
  <li>The body message contains the data being sent or received in the API interaction</li>
</ul>
" %}

{% include related_resources.html 
  title="Essential REST API Resources"
  description="Deepen your understanding of REST APIs with these carefully selected resources."
  external_links="RESTful API Design Best Practices,https://restfulapi.net/|HTTP Status Codes Reference,https://developer.mozilla.org/en-US/docs/Web/HTTP/Status"
  tools="Postman REST Client,https://www.postman.com/|Swagger for REST API Documentation,https://swagger.io/tools/swagger-ui/"
%}