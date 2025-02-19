---
title: Developing and Testing REST API as an Intermediate
keywords: [REST API development, API testing, API documentation exercises, API reference, API development practice, API authentication, Postman API testing, Flask API development, Python API, API security, hands-on API documentation, API error handling, API logging, API performance optimization]
sidebar: sidebar
permalink: /intermediatetestingapi.html
folder: mydoc
completed: 65
next:
  url: https://beingtechnicalwriter.com/apidocumentation/experttestingapi.html
previous:
  url: https://beingtechnicalwriter.com/apidocumentation/beginnertestingapi.html
---

You’ve already **built and tested a basic API** in the beginner section. Now, it’s time to **enhance it** with:

- URL parameters & query strings to handle dynamic requests  
- Error handling & validation to prevent bad data  
- Authentication (API Key) to secure access  
- Logging API requests for debugging  
- API documentation using Swagger  

By the end of this section, you’ll have a **fully functional API** with **real-world features**, making it **more powerful and production-ready**.

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

## Step 1: Modify Your API to Accept Parameters

### Add support for fetching a single user by ID

Modify `app.py` to allow users to **retrieve a specific user by ID**:

```python
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
```

**Visit Swagger UI:** [http://127.0.0.1:5000/apidocs](http://127.0.0.1:5000/apidocs)

**Test it in Postman:**
- **GET** request: `http://127.0.0.1:5000/users/1`
- **Response:**
```json
{
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com"
}
```

## Step 2: Implement API Key Authentication

```python
API_KEY = "mysecretapikey"

def check_api_key():
    key = request.headers.get("x-api-key")
    if key != API_KEY:
        return jsonify({"error": "Unauthorized"}), 403

@app.route('/users', methods=['GET'])
def get_users():
    auth = check_api_key()
    if auth:
        return auth
    return jsonify(users)
```

**Visit Swagger UI:** [http://127.0.0.1:5000/apidocs](http://127.0.0.1:5000/apidocs)

**Test it in Postman:**
- Add **Header**: `x-api-key: mysecretapikey`
- If missing, response:
```json
{
    "error": "Unauthorized"
}
```

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


## Step 3: Refactoring Swagger Docs into a Separate File

Instead of writing Swagger docs in every endpoint, let’s separate it:

### Using a YAML File for Swagger Docs

1. Create `swagger.yaml`:

```yaml
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
```

2. Modify `app.py` to load Swagger YAML:

```python
from flasgger import Swagger
import yaml

app = Flask(__name__)
with open("swagger.yaml", "r") as f:
    swagger_template = yaml.safe_load(f)
Swagger(app, template=swagger_template)
```

Now, your API documentation is **clean, structured, and easy to maintain**! 🚀

---

## What’s Next?

Congrats! You now:
- Understand **how to handle dynamic API requests**
- Implement **authentication with API keys**
- Use **Swagger to document APIs**
- Test APIs using **Postman**

Let's move to expert level
