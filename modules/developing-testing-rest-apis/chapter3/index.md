---
layout: chapter
title: "Developing and Testing REST APIs as an Expert"
description: "Master advanced API development and testing techniques with JWT authentication, RBAC, rate limiting, and more."
module_id: "developing-testing-rest-apis"
module_title: "Developing and Testing REST APIs"
chapter_number: 3
permalink: /expertapitesting.html
prev_chapter: "/intermediatetestingapi.html"
prev_title: "Developing and Testing REST APIs as an Intermediate"
module_chapters:
  - number: 1
    title: "Developing and Testing REST APIs as a Beginner"
    url: "/beginnertestingapi.html"
  - number: 2
    title: "Developing and Testing REST APIs as an Intermediate"
    url: "/intermediatetestingapi.html"
  - number: 3
    title: "Developing and Testing REST APIs as an Expert"
    url: "/expertapitesting.html"
resources:
  - title: "Flask-JWT-Extended Documentation"
    url: "https://flask-jwt-extended.readthedocs.io/"
  - title: "Flask-SQLAlchemy Documentation"
    url: "https://flask-sqlalchemy.palletsprojects.com/"
  - title: "Flask-Limiter Documentation"
    url: "https://flask-limiter.readthedocs.io/"
  - title: "JWT.io"
    url: "https://jwt.io/"
  - title: "OWASP API Security Top 10"
    url: "https://owasp.org/www-project-api-security/"
---

<div class="chapter-section">
  <h2 id="introduction">Introduction</h2>
  <p class="intro-text">
    APIs require robust authentication, security, and performance optimization to function effectively in production environments. 
    In this chapter, we will cover:
  </p>

  <div class="info-box">
    <div class="info-box-header">
      <div class="icon"><i class="fas fa-lock"></i></div>
      <span>Key Features</span>
    </div>
    <div class="info-box-content">
      <ul>
        <li><strong>JWT-based authentication</strong> for secure API access</li>
        <li><strong>Role-Based Access Control (RBAC)</strong> to manage user permissions</li>
        <li><strong>Database integration (SQLite)</strong> for user management</li>
        <li><strong>Rate limiting</strong> to prevent abuse</li>
        <li><strong>API documentation using Swagger</strong></li>
      </ul>
    </div>
  </div>
</div>

<div class="chapter-section">
  <h2 id="jwt-authentication">Step 1: Implement JWT Authentication</h2>
  
  <h3>Install Required Libraries</h3>
  <pre><code class="language-sh">pip install flask flask-jwt-extended flask-sqlalchemy flask-limiter flasgger pyyaml</code></pre>

  <h3>Modify <code>app.py</code> to Implement JWT Authentication</h3>
  <pre><code class="language-python">
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
  </code></pre>
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
  <h2 id="role-based-access-control">Step 2: Implement Role-Based Access Control (RBAC)</h2>
  
  <h3>Modify <code>app.py</code> to Restrict Access</h3>
  <pre><code class="language-python">
@app.route('/admin', methods=['GET'])
@jwt_required()
def admin():
    current_user = get_jwt_identity()
    if current_user['role'] != 'admin':
        return jsonify({"error": "Access denied"}), 403
    return jsonify(message="Welcome Admin!")
  </code></pre>
</div>

<div class="chapter-section">
  <h2 id="rate-limiting">Step 3: Implement Rate Limiting</h2>
  
  <h3>Modify <code>app.py</code> to Add Rate Limits</h3>
  <pre><code class="language-python">
@app.route('/rate-limit-test', methods=['GET'])
@limiter.limit("3 per minute")
def rate_limited_route():
    return jsonify(message="This route is rate-limited to 3 requests per minute.")
  </code></pre>
</div>

<div class="chapter-section">
  <h2 id="swagger-docs">Step 4: Refactoring Swagger Documentation</h2>
  
  <h3>Create <code>swagger.yaml</code></h3>
  <pre><code class="language-yaml">
openapi: 2.0.0
info:
  title: Advanced API
  description: API with Authentication, RBAC, and Rate Limiting
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
  </code></pre>

  <h3>Modify <code>app.py</code> to Load Swagger YAML</h3>
  <pre><code class="language-python">
from flasgger import Swagger
import yaml

with open("swagger.yaml", "r") as f:
    swagger_template = yaml.safe_load(f)
Swagger(app, template=swagger_template)
  </code></pre>
</div>

<div class="chapter-section">
  <h2 id="best-practices">Best Practices for Secure APIs</h2>

  <div class="best-practices-grid">
    <div class="practice-card">
      <h4>Use Secure Secrets</h4>
      <p>Never hardcode secrets like <code>JWT_SECRET_KEY</code> in your code. Use environment variables instead.</p>
    </div>

    <div class="practice-card">
      <h4>Limit API Requests</h4>
      <p>Implement rate limiting to prevent abuse and attacks.</p>
    </div>

    <div class="practice-card">
      <h4>Validate User Input</h4>
      <p>Ensure all inputs are sanitized to prevent injection attacks.</p>
    </div>
  </div>
</div>

  <div class="chapter-takeaways">
    <h3 class="chapter-takeaways-header">Key Takeaways</h3>
    <div class="chapter-takeaways-content">
      <ul class="chapter-takeaways-list">
    <ul>
      <li>Implemented <strong>JWT Authentication</strong></li>
      <li>Used <strong>Role-Based Access Control</strong></li>
      <li>Added <strong>Rate Limiting</strong></li>
      <li>Documented APIs using <strong>Swagger</strong></li>
    </ul>
  </div>
</div>
