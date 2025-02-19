---
title: Developing and Testing REST API as an Expert
keywords: ["REST API development", "API security", "API authentication", "Postman API testing", "Flask API development", "Python API", "JWT authentication", "Role-Based Access Control (RBAC)", "API logging", "API rate limiting", "API documentation exercises", "API reference", "API performance optimization"]
sidebar: sidebar
permalink: /expertapitesting.html
folder: mydoc
completed: 70
previous:
  url: "https://beingtechnicalwriter.com/apidocumentation/intermediatetestingapi.html"
next:
  url: "https://beingtechnicalwriter.com/apidocumentation/finalwords.html"
---

You’ve **built and tested APIs with authentication, error handling, and logging**. Now, it’s time to **advance your skills with:**

- JWT-based authentication for secure access  
- Role-Based Access Control (RBAC) for different user permissions  
- Database integration (SQLite) for persistent storage  
- Performance optimization with caching & rate limiting  

By the end of this section, you’ll have **production-level API features** used in real-world applications.

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

## Step 1: Implement JWT Authentication

### Install Required Libraries

```sh
pip install flask flask-jwt-extended flask-sqlalchemy flask-limiter flasgger pyyaml
```

### Modify `app.py` to Implement JWT Authentication

```python
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flasgger import Swagger
import yaml

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['JWT_SECRET_KEY'] = 'supersecretkey'
db = SQLAlchemy(app)
jwt = JWTManager(app)
limiter = Limiter(get_remote_address, app=app, default_limits=["5 per minute"])

with open("swagger.yaml", "r") as f:
    swagger_template = yaml.safe_load(f)
Swagger(app, template=swagger_template)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)
    role = db.Column(db.String(20), nullable=False)

@app.before_first_request
def create_tables():
    db.create_all()

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username'], password=data['password']).first()
    if user:
        access_token = create_access_token(identity={'username': user.username, 'role': user.role})
        return jsonify(access_token=access_token)
    return jsonify({"error": "Invalid credentials"}), 401

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(message=f"Welcome {current_user['username']}! Your role is {current_user['role']}.")

if __name__ == '__main__':
    app.run(debug=True)
```

**Test JWT Authentication in Postman:**
- **POST** request: `http://127.0.0.1:5000/login`
- **Body:**
```json
{
    "username": "admin",
    "password": "password123"
}
```
- **GET** request: `http://127.0.0.1:5000/protected` (Include JWT Token in Authorization Header)

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

## Step 2: Implement Role-Based Access Control (RBAC)

```python
@app.route('/admin', methods=['GET'])
@jwt_required()
def admin():
    current_user = get_jwt_identity()
    if current_user['role'] != 'admin':
        return jsonify({"error": "Access denied"}), 403
    return jsonify(message="Welcome Admin!")
```

**Test Admin Access in Postman:**
- **GET** request: `http://127.0.0.1:5000/admin`
- Requires JWT Token with `role: admin`

---

## Step 3: Implement Rate Limiting

```python
@app.route('/rate-limit-test', methods=['GET'])
@limiter.limit("3 per minute")
def rate_limited_route():
    return jsonify(message="This route is rate-limited to 3 requests per minute.")
```

**Test Rate Limiting in Postman:**
- **GET** request: `http://127.0.0.1:5000/rate-limit-test` (Try sending more than 3 requests in a minute)

## Step 4: Refactoring Swagger Docs into a YAML File

1. Create `swagger.yaml`:

```yaml
openapi: 2.0.0
info:
  title: Expert API
  description: Advanced API with Authentication and Rate Limiting
  version: 1.0.0
servers:
  - url: http://127.0.0.1:5000
paths:
  /login:
    post:
      summary: Login and get a JWT token
      responses:
        "200":
          description: JWT token generated
  /protected:
    get:
      summary: Access protected content
      responses:
        "200":
          description: Returns user details
  /admin:
    get:
      summary: Admin-only route
      responses:
        "403":
          description: Access denied
  /rate-limit-test:
    get:
      summary: Test rate limiting
      responses:
        "200":
          description: Successful request
```

2. Modify `app.py` to Load Swagger YAML:

```python
from flasgger import Swagger
import yaml

with open("swagger.yaml", "r") as f:
    swagger_template = yaml.safe_load(f)
Swagger(app, template=swagger_template)
```

Now, your API documentation is **clean, structured, and easy to maintain**!

## What’s Next?

Congrats! You have now:
- Implemented **JWT Authentication**
- Used **Role-Based Access Control**
- Added **Rate Limiting**
- Documented APIs using **Swagger**
- Tested APIs using **Postman**