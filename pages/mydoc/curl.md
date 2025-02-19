---
title: cURL for API Documentation
keywords: [REST API documentation, API writing exercises, API reference, API documentation practice, API documentation test, API writing test, Technical Writing API exercises, API documentation challenges, API documentation best practices, hands-on API documentation, advanced API writing, API error handling, API authentication, cURL API testing, API debugging, command-line API testing]
sidebar: sidebar
permalink: /curl.html
folder: mydoc
completed: 90
next:
  url: https://beingtechnicalwriter.com/apidocumentation/expertrestexercise.html
previous:
  url: https://beingtechnicalwriter.com/apidocumentation/keyconcepts.html
---

You've already tackled **API fundamentals**—rate limits, authentication, pagination, and error handling. Now, it's time to **level up** and **master cURL**, the command-line Swiss Army knife for API testing. 

## Why Learn cURL?

Whether you’re an **API technical writer, developer, or tester**, mastering **cURL** will make your life significantly easier. Here’s why:

- Test APIs **without writing code** (because who needs more code?)
- Send **GET, POST, PUT, DELETE** requests effortlessly
- Authenticate using **API keys, OAuth, and Basic Auth**
- Debug APIs with headers, status codes, and **verbose mode**
- Automate API testing using **shell scripts**

So, let’s get started!

## What is cURL?

cURL (short for *Client URL*) is a **command-line tool** used for sending HTTP requests to APIs. It's like **Postman**, but without the fancy UI.

A basic cURL command looks like this:

```sh
curl https://api.example.com
```

This sends a **GET request** to `https://api.example.com`. Simple, right? Now, let’s go deeper.

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

## Sending API Requests with cURL

### TTP Methods and cURL

APIs support different HTTP methods, and cURL makes it easy to use them:

| HTTP Method | cURL Command | Use Case |
|------------|-------------|----------|
| **GET** | `curl -X GET "https://api.example.com/users"` | Retrieve data |
| **POST** | `curl -X POST "https://api.example.com/users" -d '{"name":"John"}' -H "Content-Type: application/json"` | Create new data |
| **PUT** | `curl -X PUT "https://api.example.com/users/1" -d '{"name":"John Updated"}' -H "Content-Type: application/json"` | Update data |
| **DELETE** | `curl -X DELETE "https://api.example.com/users/1"` | Remove data |

##Adding Headers

Want to include headers in your request? Use the `-H` flag:

```sh
curl -X GET "https://api.example.com" -H "Authorization: Bearer your_token"
```

## Sending Query Parameters

Need to filter data? Just include query parameters:

```sh
curl -X GET "https://api.example.com/users?limit=10&sort=desc"
```

## Sending Data in Requests

### **Using `-d` (Data Payload)**

The `-d` flag is used to send JSON data in **POST** or **PUT** requests:

```sh
curl -X POST "https://api.example.com/users" \
     -d '{"name":"John"}' \
     -H "Content-Type: application/json"
```

### **Using `--data-urlencode` (URL-Encoded Form Data)**

When submitting form data (like login credentials), use URL encoding:

```sh
curl -X POST "https://api.example.com/login" \
     --data-urlencode "username=johndoe" \
     --data-urlencode "password=securepass"
```

{% include note.html content="You can use `-d` for form data too, but then you must manually encode special characters." %}

## Authentication Methods

### **API Key Authentication**

```sh
curl -X GET "https://api.example.com" -H "Authorization: Bearer your_api_key"
```

### **Basic Authentication**

```sh
curl -u username:password "https://api.example.com"
```

## Uploading and Downloading Files

### **Uploading a File**

Use `-F` for **multipart form data**:

```sh
curl -X POST -F "file=@myfile.jpg" "https://api.example.com/upload"
```

### **Downloading a File**

Use `-O` to save a file:

```sh
curl -O https://example.com/file.pdf
```

---

## Handling API Errors

Use `-i` to see **response headers and status codes**:

```sh
curl -i "https://api.example.com"
```

---

## Debugging API Calls

### **Verbose Mode (`-v`)**

See everything happening under the hood:

```sh
curl -v "https://api.example.com"
```

### **Silent Mode (`-s`)**

Run a request **without extra output**:

```sh
curl -s "https://api.example.com"
```

---

## Handling Redirects

Some APIs **redirect** requests. Use `-L` to follow them:

```sh
curl -L "https://api.example.com/redirect"
```

---

## Advanced cURL Flags

| Flag | Function | Example |
|------|----------|---------|
| `-X` | Specify HTTP method | `curl -X GET "https://api.example.com"` |
| `-H` | Add a request header | `curl -H "Authorization: Bearer token" "https://api.example.com"` |
| `-d` | Send request body | `curl -X POST -d '{"name":"John"}' "https://api.example.com"` |
| `-O` | Download a file | `curl -O https://example.com/file.pdf` |
| `-L` | Follow redirects | `curl -L "https://api.example.com/redirect"` |
| `-i` | Include response headers | `curl -i "https://api.example.com"` |
| `-v` | Enable verbose mode | `curl -v "https://api.example.com"` |

---

Congratulations! You’re now **fluent in cURL**, ready to test APIs like a pro. But why stop here?

You now have a deep understanding of cURL! You're fully prepared for **intermediate-level API documentation challenges.**

**Ready?**
