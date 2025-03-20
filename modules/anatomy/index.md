---
layout: default
title: "Anatomy of URLs"
module_id: "anatomy"
---

<section class="module-header">
  <div class="container">
    <div class="module-breadcrumb">
      <a href="{{ "/modules/" | relative_url }}">Modules</a> / <span>Anatomy of URLs</span>
    </div>
    <h1 class="module-title">Anatomy of URLs</h1>
    <p class="module-description">Learn the detailed components of URLs, HTTP methods, and the structure of API endpoints to better understand and document APIs.</p>
    <div class="module-completion-marker" data-module="anatomy"></div>
  </div>
</section>

<section class="module-content">
  <div class="container">
    <div class="content-wrapper">
      <div class="main-content">
        <div class="module-section">
          <h2 id="module-overview">Module Overview</h2>
          <p>This module provides a deep dive into the structure and components of URLs and API endpoints. You'll learn about the different parts of a URL, HTTP methods, and how these elements come together in API requests and responses. By understanding these fundamentals, you'll be better equipped to document APIs effectively.</p>
          
          <h3>Learning Objectives</h3>
          <ul>
            <li>Understand the anatomy of URLs and their components</li>
            <li>Learn about HTTP methods and when to use each one</li>
            <li>Comprehend how query parameters and fragment identifiers work</li>
            <li>Identify the role of paths in API endpoints</li>
            <li>Apply this knowledge to create clear and accurate API documentation</li>
          </ul>
          
          <div class="info-box">
            <h4>How This Module is Organized</h4>
            <p>This module is divided into chapters, each focusing on a specific aspect of API anatomy. Start with Chapter 1 to learn about URL components before diving deeper into API endpoints in subsequent chapters.</p>
          </div>
        </div>
        
        <div class="module-section">
          <h2 id="module-chapters">Module Chapters</h2>
          
          <div class="chapters-grid">
            <div class="chapter-card">
              <div class="chapter-number">Chapter 1</div>
              <div class="chapter-content">
                <h3>Understanding URLs</h3>
                <p>Learn the components of URLs, their structure, and how they are used in API endpoints.</p>
                <ul class="chapter-topics">
                  <li>URL components and structure</li>
                  <li>Protocol, domain, and path</li>
                  <li>Query parameters and fragments</li>
                  <li>URL encoding and special characters</li>
                </ul>
                <a href="{{ "/anatomyofurl.html" | relative_url }}" class="chapter-link">Start Chapter <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
            
            <div class="chapter-card">
              <div class="chapter-number">Chapter 2</div>
              <div class="chapter-content">
                <h3>HTTP Methods</h3>
                <p>Explore the different HTTP methods used in API requests and when to use each one.</p>
                <ul class="chapter-topics">
                  <li>GET, POST, PUT, DELETE methods</li>
                  <li>PATCH, HEAD, OPTIONS methods</li>
                  <li>Idempotent vs. non-idempotent methods</li>
                  <li>Choosing the right method for API operations</li>
                </ul>
                <a href="{{ "/methods.html" | relative_url }}" class="chapter-link">Start Chapter <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="module-section">
          <h2 id="additional-resources">Additional Resources</h2>
          <div class="resources-list">
            <div class="resource-item">
              <div class="resource-icon"><i class="fas fa-book fa-fw"></i></div>
              <div class="resource-content">
                <h4>MDN Web Docs: URLs</h4>
                <p>A comprehensive guide to URLs, their structure, and usage in web development.</p>
                <a href="https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL" target="_blank" rel="noopener">Visit Resource <i class="fas fa-external-link-alt"></i></a>
              </div>
            </div>
            
            <div class="resource-item">
              <div class="resource-icon"><i class="fas fa-book fa-fw"></i></div>
              <div class="resource-content">
                <h4>HTTP Methods Explained</h4>
                <p>In-depth explanation of HTTP methods and their use in RESTful APIs.</p>
                <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods" target="_blank" rel="noopener">Visit Resource <i class="fas fa-external-link-alt"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="sidebar">
        <div class="module-progress">
          <h3 class="sidebar-title">Your Progress</h3>
          <div class="progress-indicator" data-module="anatomy">
            <div class="progress-circle">
              <div class="progress-circle-inner">
                <span class="progress-percentage">0%</span>
              </div>
            </div>
            <div class="progress-label">
              <span>0 of 2 chapters completed</span>
            </div>
          </div>
        </div>
        
        <div class="table-of-contents">
          <h3 class="sidebar-title">On This Page</h3>
          <ul>
            <li><a href="#module-overview">Module Overview</a></li>
            <li><a href="#module-chapters">Module Chapters</a></li>
            <li><a href="#additional-resources">Additional Resources</a></li>
          </ul>
        </div>
        
        <div class="module-cta">
          <h3 class="sidebar-title">Get Started</h3>
          <a href="{{ "/anatomyofurl.html" | relative_url }}" class="btn btn-primary btn-block">Begin Chapter 1</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="cta-section">
  <div class="container">
    <div class="cta-content">
      <h2>Ready to Start Learning?</h2>
      <p>Begin with Chapter 1 to understand the structure of URLs and how they work in API requests.</p>
      <a href="{{ "/URL.html" | relative_url }}" class="btn btn-cta">Start Chapter 1: Understanding URLs</a>
    </div>
  </div>
</section>
