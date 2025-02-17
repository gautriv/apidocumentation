---
title: Understanding API Requests and Responses
keywords: [API request, API response, API status codes, API request methods, HTTP methods, API response structure, API documentation, API endpoints, API headers, API authentication, API query parameters, JSON API response, XML API response, API testing, API best practices, REST API, API examples, API guide]
sidebar: sidebar
permalink: /apirequestsresponses.html
folder: mydoc
completed: 65
next:
  url: https://beingtechnicalwriter.com/apidocumentation/writingapi.html
previous:
  url: https://beingtechnicalwriter.com/apidocumentation/visualizingdatatypes.html
---

So, you’ve met the data types—Boolean, Strings, Numbers, and their pals. Now, let’s see them in action! APIs are all about communication: You send a **request**, and you get a **response**. Think of it like texting a friend—you ask a question (request), and they reply (response). Simple, right? 

Well, APIs work in the same way but with a bit more structure. Let’s break it down!

{% include note.html content="If you’re feeling a bit lost with all the technical jargon, don’t worry! This chapter will guide you through API requests and responses step by step. By the end, you'll be making API calls like a pro!" %}

## What is an API request?

Imagine you're at a restaurant. You tell the waiter, "I'd like a margherita pizza, please!" That’s a **request**. The waiter (the API) takes your order, processes it, and brings back a pizza (the **response**).

An API request has a few main ingredients:
- **The Endpoint (URL):** This is where the request goes.
- **The HTTP Method:** Think of it as the type of request you’re making (like asking for a menu vs. placing an order).
- **Headers:** Extra info you send along with your request (like saying "No olives, please").
- **Query Parameters:** These refine your request (like asking for extra cheese).
- **Request Body (for some requests):** If you’re sending data (like placing an order), it goes here.

### Example: Making a GET request
Let’s say we want to find a book by its title.

```sh
   GET https://api.example.com/books?title=harry%20potter
   ```

- The **endpoint** is `https://api.example.com/books`
- The **method** is `GET` (because we just want to retrieve data)
- The **query parameter** is `title=harry%20potter` (we’re looking for books titled *Harry Potter*)

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


## What is an API response?

Great, you placed your order. Now the waiter brings back your pizza (hopefully the right one!). 

An API response usually includes:
- **The Status Code:** A quick signal of whether the request was successful.
- **Headers:** More details about the response.
- **The Body:** The actual data you asked for (your pizza!).

### Example: A JSON response
Here’s what the API might return for our Harry Potter book request:

```json
{
  "title": "Harry Potter and the Sorcerer’s Stone",
  "author": "J.K. Rowling",
  "published_year": 1997,
  "genre": "Fantasy"
}
```

## HTTP Methods: The different types of API requests

APIs aren’t just about **getting** data; they can also **send, update, and delete** information. That’s where HTTP methods come in.

| HTTP Method | What it does |
|-------------|-------------|
| **GET** | Retrieves data (like searching for books). |
| **POST** | Creates new data (like adding a new book). |
| **PUT** | Updates existing data (like editing a book’s details). |
| **DELETE** | Removes data (like deleting a book entry). |

### Example: A `POST` request (adding a new book)

```sh
POST https://api.example.com/books Content-Type: application/json
```

```json
{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "published_year": 1937
}
```

This tells the API: "Hey, add this book to the database!"

## Understanding status codes

When you get a text reply, sometimes it’s all good, sometimes it’s confusing, and sometimes it’s just... an error. APIs use **status codes** to tell you how things went.

| **Status Code** | **Meaning** |
|---------------|------------|
| **200 OK** | Everything worked!|
| **201 Created** | Your request was successful, and new data was created. |
| **400 Bad Request** | Something was wrong with your request. |
| **401 Unauthorized** | You need permission to access this. |
| **403 Forbidden** | You’re not allowed to access this. |
| **404 Not Found** | The thing you asked for doesn’t exist. |
| **500 Internal Server Error** | Something went wrong on the server’s side. |

### Example: A `404 Not Found` Response
```json
{
  "error": "Book not found"
}
```

## How to test API requests

Now that you understand API requests and responses, how do you test them? Simple! Here are some tools:

- **Postman** – A popular GUI tool for making API requests.
- **cURL** – A command-line tool for making HTTP requests.
- **Swagger** – Interactive documentation that lets you test endpoints.
- **Insomnia** – An easy-to-use alternative to Postman.

We'll cover more about this later in our course.

### Example: Using `cURL` to make a GET request

```sh
curl -X GET "https://api.example.com/books?title=harry%20potter" -H "Accept: application/json"
```
This sends a request and retrieves book details.

## Wrapping it up
Congrats! You now understand how API requests and responses work. Whether it’s fetching data, sending new information, or handling errors, you’ve got the basics down.

Now that you know how APIs send and receive data, it’s time to document them effectively! In the next chapter, we’ll dive into how to write clear and structured API documentation that developers will love. Get ready to level up your documentation skills!

{% include recap.html content="The main takeaways from this chapter are: <br> --> API requests contain an endpoint, method, headers, and sometimes a body. <br> --> API responses include status codes, headers, and data. <br> --> HTTP methods define the type of request (GET, POST, PUT, DELETE). <br> --> Status codes help interpret responses (200 OK, 404 Not Found, etc.). <br> --> Testing APIs using tools like Postman, cURL, and Swagger is essential. <br> --> Next up: Writing clear API documentation! " %}