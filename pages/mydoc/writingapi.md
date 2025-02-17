---
title: Writing API Documentation
keywords: [API documentation, API reference, Writing API documentation, API endpoints, API parameters, API authentication, API request examples, API response examples, API documentation structure, REST API documentation, API documentation best practices, Developer-friendly API docs]
sidebar: sidebar
permalink: /writingapi.html
folder: mydoc
completed: 70
next:
  url: https://beingtechnicalwriter.com/apidocumentation/restapidocumentation.html
previous:
  url: https://beingtechnicalwriter.com/apidocumentation/apirequestsresponses.html
---

Now that you understand **API requests and responses**, it’s time to level up and learn **how to document them effectively!** Writing API documentation isn’t just about listing endpoints and parameters—it’s about making it **clear, concise, and developer-friendly**. 

In this chapter, we’ll break down **how to structure API documentation** and write it in a way that **helps users get up and running quickly**.

{% include note.html content="Good API documentation reduces support tickets and makes an API easy to use. If a developer has to spend hours figuring out how to use your API, something’s wrong!" %}


## Structuring API documentation

Great API documentation is **well-structured** and **easy to navigate**. Here’s a solid structure to follow:

1. **Introduction** – What’s the API about? Who is it for?
2. **Getting Started** – How to authenticate and make the first request.
3. **Authentication** – API keys, OAuth, or other authentication methods.
4. **Endpoints & Methods** – Each API endpoint with details.
5. **Parameters** – Query parameters, request bodies, and headers.
6. **Example Requests & Responses** – Real-world examples.
7. **Error Handling** – Common error responses and troubleshooting.
8. **Best Practices** – Performance tips, rate limits, and security.
9. **FAQs & Additional Resources** – Common questions and links.

Developers love **consistency**, so keeping your API documentation well-organized is key!

## 1. Writing a clear API **Introduction**

Your **Introduction** should tell users **what your API does** and why they should use it. Keep it **short and to the point**.

### Example of a Good API Introduction:
> The **BookFinder API** allows developers to search for books, retrieve book details, and manage user reading lists. It supports both **RESTful** and **GraphQL** requests, offering **real-time access** to a large database of books.


## 2. Documenting **Authentication**

APIs often require **authentication** to ensure security. Clearly explain how users can authenticate.

### Example: API key Authentication

```http
GET https://api.example.com/books
Headers:
  Authorization: Bearer YOUR_API_KEY
```

Make sure to include:
- Where to find API keys (for example, in user settings).
- How to send them (for example, headers, query parameters).
- Any restrictions (for example, rate limits, expiration).

## Explaining API endpoints and methods

For each **endpoint**, document:

- **URL** (`/books`)
- **HTTP Method** (`GET`, `POST`, `PUT`, `DELETE`)
- **Description** (What does this endpoint do?)
- **Parameters** (Query parameters, request body)
- **Example Request & Response**

---

### Example: Documenting an API endpoint

#### **GET /books**
**Description:** Retrieves a list of books based on the search query.

| **Parameter** | **Type**   | **Required** | **Description**                   |
|--------------|-----------|-------------|-----------------------------------|
| `title`      | `string`  | No          | Filter by book title             |
| `author`     | `string`  | No          | Filter by author name            |
| `limit`      | `integer` | No          | Number of books to return        |

---

### **Example request**
```http
GET https://api.example.com/books?title=harry%20potter
```

### **Example response**

```json
{
  "books": [
    {
      "title": "Harry Potter and the Sorcerer’s Stone",
      "author": "J.K. Rowling",
      "published_year": 1997
    }
  ]
}
```


## Error handling and status codes

Errors happen! Make sure users **know what to expect** when things go wrong.

### Example: Common API errors

| **Status Code** | **Meaning** |
|---------------|------------|
| **400 Bad Request** | Invalid request format |
| **401 Unauthorized** | Missing or invalid API key |
| **403 Forbidden** | Insufficient permissions |
| **404 Not Found** | Requested resource not found |
| **500 Internal Server Error** | Something went wrong on the server |

### Example error response

```json
{
  "error": "Book not found",
  "status": 404
}
```
## Adding code examples for developers
Developers love working code examples. Include them for multiple programming languages if possible.

### Example: Calling the API with Python

```python
import requests

url = "https://api.example.com/books?title=harry%20potter"
headers = {"Authorization": "Bearer YOUR_API_KEY"}

response = requests.get(url, headers=headers)
print(response.json())
```

### Example: Calling the API with JavaScript

```js
fetch("https://api.example.com/books?title=harry%20potter", {
  method: "GET",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY"
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

## Best Practices for API documentation

Here are some **quick tips** to make your documentation shine:

- **Keep it simple.** Don’t over complicate explanations.
- **Be consistent.** Use the same format for every endpoint.
- **Use real examples.** Show requests and responses with actual data.
- **Provide code snippets.** Help developers integrate the API faster.
- **Keep it updated.** API changes? Update the docs!

Great job! You now know **how to structure and write API documentation** that is clear, concise, and developer-friendly.

In the subsequent chapters, we will practice documenting **APIs (REST, Webhooks, and OAuth)** and applying what we've learned.

{% include recap.html content="The main takeaways from this chapter are: 
<br> --> Structure API docs properly (Introduction, Authentication, Endpoints, Errors, etc.).
<br> --> Explain Authentication clearly (API keys, OAuth).
<br> --> Provide detailed endpoint documentation (parameters, requests, responses).
<br> --> Include error handling information (status codes, error messages).
<br> --> Add code examples in multiple languages.
<br> --> Follow best practices to make docs easy to read & use.
" %}


