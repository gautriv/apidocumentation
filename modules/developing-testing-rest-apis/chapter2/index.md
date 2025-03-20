---
layout: chapter
title: "Developing and Testing REST APIs as an Intermediate"
description: "Expand your API development and testing skills with more advanced concepts and real-world applications."
module_id: "developing-testing-rest-apis"
module_title: "Developing and Testing REST APIs"
chapter_number: 2
permalink: /intermediatetestingapi.html
prev_chapter: "/beginnertestingapi.html"
prev_title: "Developing and Testing REST APIs as a Beginner"
next_chapter: "/expertAPItesting.html"
next_title: "Developing and Testing REST APIs as an Expert"
module_chapters:
  - number: 1
    title: "Developing and Testing REST APIs as a Beginner"
    url: "/beginnertestingapi.html"
  - number: 2
    title: "Developing and Testing REST APIs as an Intermediate"
    url: "/intermediatetestingapi.html"
  - number: 3
    title: "Developing and Testing REST APIs as an Expert"
    url: "/expertAPItesting.html"
resources:
  - title: "Flask Documentation"
    url: "https://flask.palletsprojects.com/"
  - title: "Flasgger Documentation"
    url: "https://github.com/flasgger/flasgger"
  - title: "Postman Learning Center"
    url: "https://learning.postman.com/"
  - title: "Swagger/OpenAPI Specification"
    url: "https://swagger.io/specification/"
  - title: "API Security Best Practices"
    url: "https://owasp.org/www-project-api-security/"
---

<div class="chapter-content">
  <div class="chapter-section">
    <h2 id="introduction">Taking Your API Development and Testing to the Next Level</h2>
    
    <p>You've already <strong>built and tested a basic API</strong> in the beginner section. Now, it's time to <strong>enhance it</strong> with:</p>
    
    <ul>
      <li>URL parameters & query strings to handle dynamic requests</li>
      <li>Error handling & validation to prevent bad data</li>
      <li>Authentication (API Key) to secure access</li>
      <li>Logging API requests for debugging</li>
      <li>API documentation using Swagger</li>
    </ul>
    
    <p>By the end of this section, you'll have a <strong>fully functional API</strong> with <strong>real-world features</strong>, making it <strong>more powerful and production-ready</strong>.</p>
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
    <h2 id="step-1">Step 1: Modify Your API to Accept Parameters</h2>
    
    <h3>Add support for fetching a single user by ID</h3>
    
    <p>Modify <code>app.py</code> to allow users to <strong>retrieve a specific user by ID</strong>:</p>
    
    {% highlight python %}
from flask import Flask, request, jsonify
from flasgger import Swagger

app = Flask(__name__)
Swagger(app)

users = [
    {"id": 1, "name": "Alice", "email": "alice@example.com"},
    {"id": 2, "name": "Bob", "email": "bob@example.com"}
]

@app.route('/users', methods=['GET'])
def get_users():
    """
    Get all users or filter by name
    ---
    parameters:
      - name: name
        in: query
        type: string
        required: false
    responses:
      200:
        description: A list of users
    """
    name_filter = request.args.get('name')
    if name_filter:
        filtered_users = [u for u in users if name_filter.lower() in u["name"].lower()]
        return jsonify(filtered_users)
    return jsonify(users)

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """
    Get a user by ID
    ---
    parameters:
      - name: user_id
        in: path
        type: integer
        required: true
    responses:
      200:
        description: A single user object
      404:
        description: User not found
    """
    user = next((u for u in users if u["id"] == user_id), None)
    if user:
        return jsonify(user)
    return jsonify({"error": "User not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
    {% endhighlight %}
    
    <div class="testing-box">
      <h4>Testing Your API</h4>
      <p><strong>Visit Swagger UI:</strong> <a href="http://127.0.0.1:5000/apidocs" target="_blank">http://127.0.0.1:5000/apidocs</a></p>
      <p><strong>Test in Postman:</strong></p>
      <ul>
        <li><strong>GET</strong> request: <code>http://127.0.0.1:5000/users/1</code></li>
        <li><strong>Expected Response:</strong></li>
      </ul>
    </div>
    
    {% highlight json %}
{
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com"
}
    {% endhighlight %}
  </div>

  <div class="chapter-section">
    <h2 id="step-2">Step 2: Implement API Key Authentication</h2>
    
    <p>Let's secure our API by implementing API key authentication:</p>
    
    {% highlight python %}
API_KEY = "mysecretapikey"

def check_api_key():
    key = request.headers.get("x-api-key")
    if key != API_KEY:
        return jsonify({"error": "Unauthorized"}), 403
    return None

@app.route('/users', methods=['GET'])
def get_users():
    auth = check_api_key()
    if auth:
        return auth
    return jsonify(users)
    {% endhighlight %}
    
    <div class="testing-box">
      <h4>Testing Your API Authentication</h4>
      <p><strong>Visit Swagger UI:</strong> <a href="http://127.0.0.1:5000/apidocs" target="_blank">http://127.0.0.1:5000/apidocs</a></p>
      <p><strong>Test in Postman:</strong></p>
      <ul>
        <li>Add <strong>Header</strong>: <code>x-api-key: mysecretapikey</code></li>
        <li>If missing, response:</li>
      </ul>
    </div>
    
    {% highlight json %}
{
    "error": "Unauthorized"
}
    {% endhighlight %}
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
    <h2 id="step-3">Step 3: Refactoring Swagger Docs into a Separate File</h2>
    
    <p>Instead of writing Swagger docs in every endpoint, let's separate it:</p>
    
    <h3>Using a YAML File for Swagger Docs</h3>
    
    <ol>
      <li>Create <code>swagger.yaml</code>:</li>
    </ol>
    
    {% highlight yaml %}
openapi: 2.0.0
info:
  title: User Info API
  description: API for retrieving user details
  version: 1.0.0
servers:
  - url: http://127.0.0.1:5000
paths:
  /users:
    get:
      summary: Get all users
      parameters:
        - name: name
          in: query
          required: false
          type: string
      responses:
        "200":
          description: A list of users
  /users/{user_id}:
    get:
      summary: Get a user by ID
      parameters:
        - name: user_id
          in: path
          required: true
          type: integer
      responses:
        "200":
          description: User details
        "404":
          description: User not found
    {% endhighlight %}
    
    <ol start="2">
      <li>Modify <code>app.py</code> to load the YAML file:</li>
    </ol>
    
    {% highlight python %}
from flasgger import Swagger
import yaml

app = Flask(__name__)
with open("swagger.yaml", "r") as f:
    swagger_template = yaml.safe_load(f)
Swagger(app, template=swagger_template)
    {% endhighlight %}
    
    <p>Now, your API documentation is <strong>clean, structured, and easy to maintain</strong>!</p>
  </div>

  <div class="chapter-section">
    <h2 id="whats-next">What's Next?</h2>
    
    <p>Congrats! You now:</p>
    <ul>
      <li>Understand <strong>how to handle dynamic API requests</strong></li>
      <li>Implement <strong>authentication with API keys</strong></li>
      <li>Use <strong>Swagger to document APIs</strong></li>
      <li>Test APIs using <strong>Postman</strong></li>
    </ul>
    
    <p>Let's move to expert level in the next chapter.</p>
  </div>
</div>
