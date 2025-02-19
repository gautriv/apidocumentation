---
title: Developing and Testing an API as a Beginner
keywords: [REST API development, API testing, API writing exercises, API reference, API documentation practice, API development tutorial, Postman API testing, Flask API development, Python API, API authentication, API versioning, hands-on API documentation, API performance optimization, API error handling, API security]
sidebar: sidebar
permalink: /beginnertestingapi.html
folder: mydoc
completed: 60
next:
  url: https://beingtechnicalwriter.com/apidocumentation/intermediateapi.html
previous:
  url: https://beingtechnicalwriter.com/apidocumentation/expertrestapiexercises.html
---

You’ve **documented APIs**, but now it’s time to take a **hands-on approach**—let’s build, document, and test our own API step by step!

## Setting Up Your Development Environment

Before we get started, install the necessary tools:

### Install Python & Flask

Download Python from [Python Official Website](https://www.python.org/downloads/), then install Flask:
```sh
pip install flask flasgger
```

Verify installations:
```sh
python --version
pip show flask flasgger
# This installs flask and swagger
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


## Building a Basic Flask API

Let's start with a simple **Hello API**.

Create a file `app.py` and add the following:

```python
from flask import Flask, jsonify
from flasgger import Swagger

app = Flask(__name__)
Swagger(app)

@app.route('/')
def home():
    """
    Welcome Endpoint
    ---
    responses:
      200:
        description: Welcome Message
    """
    return jsonify({"message": "Hello, API World!"})

if __name__ == '__main__':
    app.run(debug=True)
```

Run the app:
```sh
python app.py
```

**Visit Swagger UI:**
[http://127.0.0.1:5000/apidocs](http://127.0.0.1:5000/apidocs)

### Test in Postman
1. Open Postman
2. Send a **GET** request to `http://127.0.0.1:5000/`
3. Confirm response:
```json
{"message": "Hello, API World!"}
```

---

## Creating CRUD Endpoints (GET, POST, PUT, DELETE)

Let's create **CRUD endpoints** step by step and test each in Postman.

### GET Users

```python
@app.route('/users', methods=['GET'])
def get_users():
    """
    Get all users
    ---
    responses:
      200:
        description: A list of users
    """
    users = [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]
    return jsonify(users)
```
**Visit Swagger UI:** [http://127.0.0.1:5000/apidocs](http://127.0.0.1:5000/apidocs)

**Test in Postman:** Send a **GET** request to `http://127.0.0.1:5000/users`.

### POST Users

```python
from flask import request

@app.route('/users', methods=['POST'])
def add_user():
    """
    Add a new user
    ---
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            name:
              type: string
    responses:
      201:
        description: User added successfully
    """
    data = request.get_json()
    return jsonify({"message": "User added!", "user": data}), 201
```
**Visit Swagger UI:** [http://127.0.0.1:5000/apidocs](http://127.0.0.1:5000/apidocs)

**Test in Postman:** Send a **POST** request to `http://127.0.0.1:5000/users` with:
```json
{
    "name": "Charlie"
}
```

### PUT Users

```python
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    """
    Update a user
    ---
    parameters:
      - name: user_id
        in: path
        required: true
        type: integer
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            name:
              type: string
    responses:
      200:
        description: User updated successfully
    """
    data = request.get_json()
    return jsonify({"message": "User updated!", "user_id": user_id, "new_data": data})
```
**Visit Swagger UI:** [http://127.0.0.1:5000/apidocs](http://127.0.0.1:5000/apidocs)

**Test in Postman:** Send a **PUT** request to `http://127.0.0.1:5000/users/1` with:
```json
{
    "name": "Updated Name"
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

### DELETE Users

```python
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    """
    Delete a user
    ---
    parameters:
      - name: user_id
        in: path
        required: true
        type: integer
    responses:
      200:
        description: User deleted successfully
    """
    return jsonify({"message": "User deleted!", "user_id": user_id})
```
**Visit Swagger UI:** [http://127.0.0.1:5000/apidocs](http://127.0.0.1:5000/apidocs)

**Test in Postman:** Send a **DELETE** request to `http://127.0.0.1:5000/users/1`.

## Refactoring Swagger Docs into a Separate File

Instead of writing Swagger docs in every endpoint, let’s separate it:

### Using a Python File for Swagger Docs
1. Create a new file `swagger_config.py`:

```python
swagger_template = {
    "swagger": "2.0",
    "info": {
        "title": "User API",
        "description": "API for managing users",
        "version": "1.0.0"
    },
    "paths": {
        "/users": {
            "get": {
                "summary": "Get all users",
                "responses": {
                    "200": {
                        "description": "A list of users"
                    }
                }
            },
            "post": {
                "summary": "Add a new user",
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "User added successfully"
                    }
                }
            }
        },
        "/users/{user_id}": {
            "put": {
                "summary": "Update a user",
                "parameters": [
                    {
                        "name": "user_id",
                        "in": "path",
                        "required": true,
                        "type": "integer"
                    },
                    {
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "User updated successfully"
                    }
                }
            },
            "delete": {
                "summary": "Delete a user",
                "parameters": [
                    {
                        "name": "user_id",
                        "in": "path",
                        "required": true,
                        "type": "integer"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "User deleted successfully"
                    }
                }
            }
        }
    }
}
```

2. Modify `app.py`:

```python
from swagger_config import swagger_template
Swagger(app, template=swagger_template)
```

### Using a YAML File for Swagger Docs

Alternatively, you can define your Swagger documentation in a separate YAML file:

1. Create a new file `swagger.yaml`:

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
      responses:
        "200":
          description: Successful response with user details
  /users/{user_id}:
    put:
      summary: Update a user
      parameters:
        - name: user_id
          in: path
          required: true
          type: integer
      responses:
        "200":
          description: User updated successfully
    delete:
      summary: Delete a user
      parameters:
        - name: user_id
          in: path
          required: true
          type: integer
      responses:
        "200":
          description: User deleted successfully
```

2. Modify `app.py` to load the YAML file:

```python
from flasgger import Swagger
import yaml

app = Flask(__name__)
with open("swagger.yaml", "r") as f:
    swagger_template = yaml.safe_load(f)
Swagger(app, template=swagger_template)
```

Now, your API documentation is **modular, clean, and easier to maintain**! 

## What’s Next?

Congrats! You now:
- Know **how to build APIs** with Flask
- Understand **how to document APIs with Swagger**
- Can **test APIs** using Postman & cURL

Ready for the **next challenge**?
