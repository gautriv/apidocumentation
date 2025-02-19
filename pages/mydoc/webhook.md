---
title: Webhook API reference documentation
keywords: [Webhooks, API documentation, Webhook vs REST API, API reference, Webhook best practices, API integration, Webhook security, API event-driven architecture]
sidebar: sidebar
permalink: /webhooks.html
folder: mydoc
completed: 68
previous:
  url: "https://beingtechnicalwriter.com/apidocumentation/experttestingapi.html"
next:
  url: "https://beingtechnicalwriter.com/apidocumentation/finalwords.html"
---

Alright, so you’ve spent a good chunk of time building, testing, and documenting **REST APIs**. Feels great, right? But here’s the thing: **polling sucks.**  

Imagine constantly refreshing your email inbox to see if you've got mail. Annoying, isn’t it? Well, that’s exactly what happens when clients keep sending **GET requests** to check if new data is available. Enter **webhooks**—the solution to avoid being that impatient person hitting "refresh" every five seconds.  

Webhooks don’t wait for you to ask. **They tell you when something important happens.** That’s right—real-time notifications, no unnecessary API calls, and fewer server meltdowns.  

Let’s break it down.

## What is a Webhook?

A **webhook** is an **event-driven API callback** that sends data to a specified URL when something happens in an application. Instead of constantly asking, *"Hey, got any updates?"*, webhooks just notify your system **the moment something changes**.  

For example:  
- A **payment gateway** (like Stripe) sends a webhook when a payment succeeds.  
- A **GitHub repo** fires a webhook when a new commit is pushed.  
- A **project management tool** notifies your app when a task is completed.  

Essentially, webhooks are the **instant coffee** of APIs—quick, effective, and always ready when you need them.

### **How It Works**  
1. You **register a webhook URL** where you want to receive event notifications.  
2. When a specific event occurs (e.g., payment completed, file uploaded), the system **sends an HTTP POST request** to your webhook URL.  
3. Your server **processes the incoming request** and takes appropriate action.  

## Webhooks vs REST APIs: What’s the difference?

| Feature | REST API | Webhook |
|---------|---------|---------|
| **Communication** | Client requests info | Server sends info automatically |
| **Data Flow** | Pull (Client asks) | Push (Server notifies) |
| **Use Case** | Good for structured queries & data retrieval | Great for real-time event notifications |
| **Efficiency** | Can be slow due to repeated polling | Faster since updates come instantly |
| **Example** | *GET /orders* → Returns all orders | *Order completed* → Sends an event to your webhook URL |

REST APIs are like checking in at the airport every 5 minutes to see if your flight is boarding. Webhooks are like **getting a text when it’s time to go.**

## Webhook API reference documentation 

APIs are usually **request-based**, meaning you call an API and wait for a response. But what if you could get **notified** automatically when something happens?  

That's exactly what **webhooks** do! Instead of **constantly checking for updates**, webhooks send **real-time notifications** to your system when an event occurs.  

This section will walk you through how to set up, handle, and document webhooks properly—so you can effectively integrate them into your API documentation.

Since webhooks **push data** instead of waiting for requests, documenting them requires a slightly different approach. Following are the components that you must include to write a **kickass webhook API reference.**

### Webhook Overview  
> Webhooks allow you to receive real-time notifications when an event occurs in our system. Instead of polling our API, you can subscribe to specific events and receive an HTTP POST request to your webhook URL when they occur.

### Webhook URL Setup  

Before receiving webhooks, your system must be **ready to accept HTTP POST requests** at a public endpoint. Here’s how you can configure it.

| Field | Type | Description |
|--------|------|-------------|
| **URL** | `string` | Your endpoint that listens for webhook events |
| **Method** | `POST` | Webhooks always send data via POST requests |
| **Content-Type** | `application/json` | Webhook payloads are sent in JSON format |
| **Secret Key** | `string` | Used to verify that the webhook request is authentic |

#### Example Configuration
To start receiving webhooks, provide us with your **public webhook URL**.

```sh
POST https://yourdomain.com/webhooks/order_completed
```

Your server must be **configured to accept POST requests**, extract the data, and process it accordingly.

### Webhook event types  

Webhooks can be triggered for different events. Below are some common events that an API might support.

| Event Name | Description |
|------------|------------|
| **order.completed** | Triggered when an order is successfully completed. |
| **invoice.paid** | Fired when an invoice payment is received. |
| **user.signup** | Sent when a new user registers on the platform. |

You can subscribe to the events you need and ignore the rest.

### Webhook payload format 

When an event is triggered, the webhook sends a **JSON payload** to your configured URL.

#### Example: order.completed event  

#### Request body  
```json
{
  "event": "order.completed",
  "data": {
    "order_id": "12345",
    "customer": {
      "name": "John Doe",
      "email": "john@example.com"
    },
    "total": 49.99,
    "currency": "USD"
  }
}
```

#### Request headers
```sh
Content-Type: application/json
X-Signature: a94a8fe5ccb19ba61c4c0873d391e987982fbbd3
```

### Securing webhooks  

Since webhooks are **publicly accessible**, security is **crucial**. Anyone could send a **fake request** to your webhook endpoint, so you **must verify webhook authenticity** before processing the request.

### Signature verification  

Every webhook request includes an **X-Signature** header. You should compute an **HMAC-SHA256 hash** using your **secret key** and compare it with the received signature.

#### Example Python Code for Signature Verification

```python
import hmac
import hashlib

secret = "your-webhook-secret"
payload = '{"event":"order.completed","data":{"order_id":"12345"}}'
received_signature = "a94a8fe5ccb19ba61c4c0873d391e987982fbbd3"

calculated_signature = hmac.new(
    key=secret.encode(),
    msg=payload.encode(),
    digestmod=hashlib.sha256
).hexdigest()

if calculated_signature == received_signature:
    print("Webhook verified!")
else:
    print("Invalid webhook request.")
```

If the signature matches, the request is valid. If not, reject it immediately.

### Handling webhook responses  

When your server **receives a webhook**, it should return a **200 OK** response to acknowledge receipt.

#### Response codes  

| Response Code | Meaning |
|--------------|---------|
| `200 OK` | Webhook received successfully |
| `400 Bad Request` | Invalid request format |
| `401 Unauthorized` | Signature verification failed |
| `500 Internal Server Error` | Something went wrong on your server |

If your server **does not respond with 200 OK**, we **retry sending the webhook up to 3 times**.

### Webhook best practices  

To ensure **reliable webhook handling**, follow these best practices:

- **Use HTTPS** – Encrypt webhook payloads with **SSL/TLS**.  
- **Validate the request** – Verify webhook **signatures** before processing.  
- **Log webhook requests** – Store **logs** for debugging in case something goes wrong.  
- **Respond quickly** – Return a `200 OK` response **immediately** and process data asynchronously.  
- **Handle retries** – If a webhook **delivery fails**, be ready to **receive retries**.  


Webhooks are **powerful, efficient**, and **reduce unnecessary API calls**. Instead of **polling for updates**, webhooks **push real-time data** to your system, making applications **faster and more responsive**.  

If **REST APIs** are like **constantly checking your phone for updates**, **webhooks are like getting a notification exactly when you need it**.  

In the subsequent chapters, we will practice documenting **Webhooks** and applying what we’ve learned.