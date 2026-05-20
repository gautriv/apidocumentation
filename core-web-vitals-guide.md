---
layout: default
title: "Core Web Vitals Guide: Boost Your SEO and CTR in 2023"
description: "Learn how to check, optimize, and improve your Core Web Vitals for better search rankings and higher click-through rates (CTR). Complete step-by-step guide."
keywords: Core Web Vitals, LCP, FID, CLS, PageSpeed, SEO optimization, website performance, CTR improvement
canonical: https://beingtechnicalwriter.com/apidocumentation/core-web-vitals-guide
image: /assets/images/core-web-vitals.svg
last_modified_at: 2023-09-15T12:00:00+00:00
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Check and Improve Core Web Vitals",
  "description": "A step-by-step guide to measuring and optimizing your Core Web Vitals scores for better SEO and higher CTR",
  "image": "https://beingtechnicalwriter.com/apidocumentation/assets/images/core-web-vitals.svg",
  "totalTime": "PT1H",
  "tool": [
    {
      "@type": "HowToTool",
      "name": "Google PageSpeed Insights"
    },
    {
      "@type": "HowToTool",
      "name": "Chrome DevTools"
    }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "name": "Check your Core Web Vitals with PageSpeed Insights",
      "url": "https://beingtechnicalwriter.com/apidocumentation/core-web-vitals-guide#measure",
      "image": "https://beingtechnicalwriter.com/apidocumentation/assets/images/pagespeed-insights.svg",
      "text": "Visit PageSpeed Insights and enter your website URL to get a detailed report of your Core Web Vitals metrics."
    },
    {
      "@type": "HowToStep",
      "name": "Optimize Largest Contentful Paint (LCP)",
      "url": "https://beingtechnicalwriter.com/apidocumentation/core-web-vitals-guide#lcp",
      "image": "https://beingtechnicalwriter.com/apidocumentation/assets/images/lcp-optimization.svg",
      "text": "Improve server response time, optimize CSS and JavaScript, and use proper image optimization techniques."
    },
    {
      "@type": "HowToStep",
      "name": "Improve First Input Delay (FID)",
      "url": "https://beingtechnicalwriter.com/apidocumentation/core-web-vitals-guide#fid",
      "image": "https://beingtechnicalwriter.com/apidocumentation/assets/images/fid-optimization.svg",
      "text": "Break up long tasks, optimize JavaScript execution, and reduce third-party code impact."
    },
    {
      "@type": "HowToStep",
      "name": "Fix Cumulative Layout Shift (CLS)",
      "url": "https://beingtechnicalwriter.com/apidocumentation/core-web-vitals-guide#cls",
      "image": "https://beingtechnicalwriter.com/apidocumentation/assets/images/cls-optimization.svg",
      "text": "Set explicit dimensions for images and videos, prevent late-loading content shifts, and use proper ad containment."
    }
  ]
}
</script>

<div class="container">
  <div class="row">
    <div class="col-md-10 offset-md-1">
      <article class="article-content">
        <header class="article-header">
          <h1>Core Web Vitals Guide: Boost Your SEO and CTR in 5 Steps</h1>
          <div class="meta-info">
            <span class="last-updated"><i class="fas fa-calendar-alt"></i> Last Updated: September 15, 2023</span>
            <span class="reading-time"><i class="fas fa-clock"></i> 6 min read</span>
          </div>
          <div class="article-summary">
            <p>Core Web Vitals are essential metrics that measure user experience on your website and directly impact your search rankings and click-through rates. In this guide, we'll show you exactly how to measure, understand, and improve your Core Web Vitals to boost both your SEO performance and CTR.</p>
          </div>
        </header>

        <div class="table-of-contents">
          <h2>Quick Navigation:</h2>
          <ol>
            <li><a href="#introduction">What Are Core Web Vitals?</a></li>
            <li><a href="#measure">How to Measure Your Core Web Vitals</a></li>
            <li><a href="#lcp">Optimizing Largest Contentful Paint (LCP)</a></li>
            <li><a href="#fid">Improving First Input Delay (FID)</a></li>
            <li><a href="#cls">Fixing Cumulative Layout Shift (CLS)</a></li>
            <li><a href="#checklist">Complete Core Web Vitals Checklist</a></li>
          </ol>
        </div>

        <section id="introduction">
          <h2>1. What Are Core Web Vitals?</h2>
          
          <p>Core Web Vitals are a set of specific factors that Google considers important for user experience on a webpage. These metrics have become an official ranking factor, directly affecting your search visibility and click-through rates.</p>
          
          <div class="metrics-overview">
            <div class="metric-card">
              <div class="metric-icon lcp-icon">
                <i class="fas fa-hourglass-half"></i>
              </div>
              <div class="metric-details">
                <h3>Largest Contentful Paint (LCP)</h3>
                <p><strong>Measures:</strong> Loading performance</p>
                <p><strong>Good score:</strong> ≤ 2.5 seconds</p>
                <p>LCP measures how quickly the main content of your page becomes visible to users. Faster LCP creates the perception of a speedy site.</p>
              </div>
            </div>
            
            <div class="metric-card">
              <div class="metric-icon fid-icon">
                <i class="fas fa-hand-pointer"></i>
              </div>
              <div class="metric-details">
                <h3>First Input Delay (FID)</h3>
                <p><strong>Measures:</strong> Interactivity</p>
                <p><strong>Good score:</strong> ≤ 100 milliseconds</p>
                <p>FID measures the time from when a user first interacts with your page to when the browser can begin processing that interaction.</p>
              </div>
            </div>
            
            <div class="metric-card">
              <div class="metric-icon cls-icon">
                <i class="fas fa-arrows-alt"></i>
              </div>
              <div class="metric-details">
                <h3>Cumulative Layout Shift (CLS)</h3>
                <p><strong>Measures:</strong> Visual stability</p>
                <p><strong>Good score:</strong> ≤ 0.1</p>
                <p>CLS measures how much visible content shifts around during page loading. Lower scores mean less unexpected movement.</p>
              </div>
            </div>
          </div>
          
          <div class="impact-box">
            <h3>How Core Web Vitals Impact CTR</h3>
            <p>Google found that as page load time increases from 1s to 3s, the probability of bounce increases by 32%. Sites that meet Core Web Vitals standards see:</p>
            <ul>
              <li>24% fewer abandons</li>
              <li>Up to 35% lower bounce rates</li> 
              <li>Significant increases in organic CTR</li>
              <li>Higher conversion rates (by up to 27%)</li>
            </ul>
          </div>
        </section>

        <section id="measure">
          <h2>2. How to Measure Your Core Web Vitals</h2>
          
          <p>Before you can improve your scores, you need to know where you stand. Here are the best tools to measure your Core Web Vitals:</p>
          
          <div class="tools-grid">
            <div class="tool-card">
              <h3>PageSpeed Insights</h3>
              <img src="https://beingtechnicalwriter.com/apidocumentation/assets/images/pagespeed-insights.svg" alt="PageSpeed Insights screenshot" class="tool-screenshot">
              <p>Provides both lab and field data for all Core Web Vitals metrics. Simply enter your URL and get a comprehensive report.</p>
              <a href="https://pagespeed.web.dev/" class="btn btn-sm btn-primary" target="_blank" rel="noopener">Open Tool</a>
            </div>
            
            <div class="tool-card">
              <h3>Chrome DevTools</h3>
              <img src="https://beingtechnicalwriter.com/apidocumentation/assets/images/chrome-devtools.svg" alt="Chrome DevTools screenshot" class="tool-screenshot">
              <p>Use the Performance and Network panels to analyze load times, JavaScript execution, and layout shifts.</p>
              <p class="tool-tip"><strong>Tip:</strong> Press F12 in Chrome to open DevTools</p>
            </div>
            
            <div class="tool-card">
              <h3>Search Console</h3>
              <img src="https://beingtechnicalwriter.com/apidocumentation/assets/images/search-console.svg" alt="Search Console screenshot" class="tool-screenshot">
              <p>View Core Web Vitals data for your entire site and identify pages that need improvement.</p>
              <a href="https://search.google.com/search-console" class="btn btn-sm btn-primary" target="_blank" rel="noopener">Open Tool</a>
            </div>
          </div>
          
          <div class="code-block">
            <h3>Quick Measurement with JavaScript</h3>
            <p>You can also measure Core Web Vitals directly in your browser console:</p>
            <pre><code class="language-javascript">// Check LCP
new PerformanceObserver((entryList) => {
  const entries = entryList.getEntries();
  const lastEntry = entries[entries.length - 1];
  console.log('LCP:', lastEntry.startTime / 1000, 'seconds');
}).observe({type: 'largest-contentful-paint', buffered: true});

// Check CLS
let cls = 0;
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    if (!entry.hadRecentInput) {
      cls += entry.value;
    }
  }
  console.log('CLS:', cls);
}).observe({type: 'layout-shift', buffered: true});</code></pre>
          </div>
        </section>

        <section id="lcp">
          <h2>3. Optimizing Largest Contentful Paint (LCP)</h2>
          
          <p>LCP measures how quickly the largest content element (image, video, or text block) becomes visible to users. Here's how to improve it:</p>
          
          <div class="optimization-steps">
            <div class="step">
              <h3>Eliminate Render-Blocking Resources</h3>
              <p>Render-blocking resources prevent your page from displaying quickly. To fix:</p>
              <ul>
                <li>Move critical CSS inline</li>
                <li>Defer non-critical CSS with <code>media="print"</code> or <code>rel="preload"</code></li>
                <li>Use <code>async</code> or <code>defer</code> attributes on non-critical scripts</li>
                <li>Consider code-splitting your JavaScript bundles</li>
              </ul>
              <div class="code-sample">
                <pre><code class="language-html">&lt;!-- Before -->
&lt;link rel="stylesheet" href="styles.css">
&lt;script src="app.js">&lt;/script>

&lt;!-- After -->
&lt;style>
  /* Critical CSS here */
&lt;/style>
&lt;link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">
&lt;script src="app.js" defer>&lt;/script></code></pre>
              </div>
            </div>
            
            <div class="step">
              <h3>Optimize Images</h3>
              <p>Images are often the largest content elements and key to LCP optimization:</p>
              <ul>
                <li>Use modern formats like WebP or AVIF</li>
                <li>Implement responsive images with <code>srcset</code></li>
                <li>Compress images without sacrificing quality</li>
                <li>Consider a CDN for image hosting</li>
                <li>Preload important images</li>
              </ul>
              <div class="code-sample">
                <pre><code class="language-html">&lt;!-- Preload critical hero image -->
&lt;link rel="preload" as="image" href="hero.webp">

&lt;!-- Responsive images -->
&lt;img 
  srcset="hero-small.webp 400w, hero-medium.webp 800w, hero-large.webp 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
  src="hero-medium.webp"
  alt="Hero image"
  width="800"
  height="450"
></code></pre>
              </div>
            </div>
            
            <div class="step">
              <h3>Optimize Server Response Time</h3>
              <p>A slow server delays everything else. Here's how to improve:</p>
              <ul>
                <li>Use a performance-optimized hosting provider</li>
                <li>Implement server-side caching</li>
                <li>Consider a CDN for static assets</li>
                <li>Optimize database queries</li>
                <li>Minimize HTTP requests</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="fid">
          <h2>4. Improving First Input Delay (FID)</h2>
          
          <p>FID measures the time from when a user first interacts with your site to when the browser can respond. Here's how to optimize it:</p>
          
          <div class="optimization-steps">
            <div class="step">
              <h3>Minimize JavaScript Execution Time</h3>
              <p>Heavy JavaScript processing is the primary cause of poor FID. To improve:</p>
              <ul>
                <li>Break up long-running tasks (> 50ms)</li>
                <li>Use Web Workers for CPU-intensive tasks</li>
                <li>Remove unused JavaScript</li>
                <li>Defer or lazy-load non-critical scripts</li>
              </ul>
              <div class="code-sample">
                <pre><code class="language-javascript">// Before: Long-running task blocking the main thread
function processData(items) {
  for (let i = 0; i < items.length; i++) {
    // Heavy processing here
  }
}

// After: Break into smaller chunks with requestIdleCallback
function processData(items) {
  const chunk = 100;
  let index = 0;
  
  function doChunk() {
    const stop = Math.min(index + chunk, items.length);
    for (let i = index; i < stop; i++) {
      // Process item
    }
    index = stop;
    
    if (index < items.length) {
      // More to do, schedule next chunk
      window.requestIdleCallback(doChunk);
    }
  }
  
  window.requestIdleCallback(doChunk);
}</code></pre>
              </div>
            </div>
            
            <div class="step">
              <h3>Optimize Third-Party Impact</h3>
              <p>Third-party scripts often significantly impact FID:</p>
              <ul>
                <li>Audit and remove unnecessary third-party scripts</li>
                <li>Load third-party scripts after critical content</li>
                <li>Use <code>async</code> or <code>defer</code> for third-party scripts</li>
                <li>Consider self-hosting critical third-party scripts</li>
              </ul>
            </div>
            
            <div class="step">
              <h3>Implement Browser Hints</h3>
              <p>Browser hints can prepare resources before they're needed:</p>
              <ul>
                <li>Use <code>preconnect</code> for important third-party domains</li>
                <li>Use <code>dns-prefetch</code> for less important domains</li>
                <li>Consider implementing <code>prefetch</code> for resources needed on next page</li>
              </ul>
              <div class="code-sample">
                <pre><code class="language-html">&lt;!-- Preconnect to critical third-party domains -->
&lt;link rel="preconnect" href="https://analytics.example.com">
&lt;link rel="dns-prefetch" href="https://fonts.googleapis.com">

&lt;!-- Prefetch for next page resources -->
&lt;link rel="prefetch" href="/next-page.js"></code></pre>
              </div>
            </div>
          </div>
        </section>

        <section id="cls">
          <h2>5. Fixing Cumulative Layout Shift (CLS)</h2>
          
          <p>CLS measures visual stability by quantifying unexpected layout shifts. Here's how to minimize layout shifts:</p>
          
          <div class="optimization-steps">
            <div class="step">
              <h3>Set Size Attributes on Media</h3>
              <p>Always specify dimensions for images and videos:</p>
              <ul>
                <li>Add width and height attributes to all <code>&lt;img&gt;</code> elements</li>
                <li>Use aspect-ratio CSS property for responsive elements</li>
                <li>Set dimensions for video elements and embeds</li>
              </ul>
              <div class="code-sample">
                <pre><code class="language-html">&lt;!-- Before: No dimensions specified -->
&lt;img src="product.jpg" alt="Product">

&lt;!-- After: Dimensions specified -->
&lt;img src="product.jpg" alt="Product" width="400" height="300">

&lt;!-- CSS for responsive images that maintain aspect ratio -->
img {
  max-width: 100%;
  height: auto;
  aspect-ratio: attr(width) / attr(height);
}</code></pre>
              </div>
            </div>
            
            <div class="step">
              <h3>Reserve Space for Dynamic Content</h3>
              <p>Content that loads after the initial render often causes shifts:</p>
              <ul>
                <li>Implement content placeholders or skeletons</li>
                <li>Pre-allocate space for ads and embeds</li>
                <li>Use min-height for containers that will be populated dynamically</li>
              </ul>
              <div class="code-sample">
                <pre><code class="language-css">/* Reserve space for an ad that loads later */
.ad-container {
  min-height: 250px;
  width: 100%;
}

/* Create a loading skeleton effect */
.content-skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
  min-height: 120px;
  margin-bottom: 10px;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}</code></pre>
              </div>
            </div>
            
            <div class="step">
              <h3>Manage Web Font Loading</h3>
              <p>Font loading can cause significant layout shifts:</p>
              <ul>
                <li>Use <code>font-display: swap</code> to show text while fonts load</li>
                <li>Preload important fonts</li>
                <li>Consider using system font stacks</li>
                <li>Set explicit font fallbacks that closely match the web font</li>
              </ul>
              <div class="code-sample">
                <pre><code class="language-html">&lt;!-- Preload critical fonts -->
&lt;link rel="preload" href="/fonts/roboto.woff2" as="font" type="font/woff2" crossorigin>

&lt;style>
  /* Use system font stack as fallback */
  body {
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
      Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  }
  
  /* Set font-display to swap */
  @font-face {
    font-family: 'Roboto';
    src: url('/fonts/roboto.woff2') format('woff2');
    font-display: swap;
  }
&lt;/style></code></pre>
              </div>
            </div>
          </div>
        </section>

        <section id="checklist">
          <h2>6. Complete Core Web Vitals Checklist</h2>
          
          <div class="checklist-container">
            <h3>Largest Contentful Paint (LCP) Checklist</h3>
            <ul class="checklist">
              <li>
                <input type="checkbox" id="lcp1">
                <label for="lcp1">Eliminate render-blocking resources</label>
              </li>
              <li>
                <input type="checkbox" id="lcp2">
                <label for="lcp2">Implement proper image optimization</label>
              </li>
              <li>
                <input type="checkbox" id="lcp3">
                <label for="lcp3">Minimize server response time</label>
              </li>
              <li>
                <input type="checkbox" id="lcp4">
                <label for="lcp4">Preload critical resources</label>
              </li>
              <li>
                <input type="checkbox" id="lcp5">
                <label for="lcp5">Use a CDN for faster delivery</label>
              </li>
              <li>
                <input type="checkbox" id="lcp6">
                <label for="lcp6">Streamline critical rendering path</label>
              </li>
            </ul>
            
            <h3>First Input Delay (FID) Checklist</h3>
            <ul class="checklist">
              <li>
                <input type="checkbox" id="fid1">
                <label for="fid1">Minimize JavaScript execution time</label>
              </li>
              <li>
                <input type="checkbox" id="fid2">
                <label for="fid2">Break up long tasks into smaller ones</label>
              </li>
              <li>
                <input type="checkbox" id="fid3">
                <label for="fid3">Use Web Workers for heavy processing</label>
              </li>
              <li>
                <input type="checkbox" id="fid4">
                <label for="fid4">Optimize third-party script loading</label>
              </li>
              <li>
                <input type="checkbox" id="fid5">
                <label for="fid5">Implement browser hints (preconnect, prefetch)</label>
              </li>
              <li>
                <input type="checkbox" id="fid6">
                <label for="fid6">Audit and remove unused JavaScript</label>
              </li>
            </ul>
            
            <h3>Cumulative Layout Shift (CLS) Checklist</h3>
            <ul class="checklist">
              <li>
                <input type="checkbox" id="cls1">
                <label for="cls1">Set explicit dimensions for all media</label>
              </li>
              <li>
                <input type="checkbox" id="cls2">
                <label for="cls2">Reserve space for ads and embeds</label>
              </li>
              <li>
                <input type="checkbox" id="cls3">
                <label for="cls3">Optimize font loading with font-display</label>
              </li>
              <li>
                <input type="checkbox" id="cls4">
                <label for="cls4">Avoid inserting content above existing content</label>
              </li>
              <li>
                <input type="checkbox" id="cls5">
                <label for="cls5">Use transform animations instead of properties that trigger layout</label>
              </li>
              <li>
                <input type="checkbox" id="cls6">
                <label for="cls6">Implement content placeholders for dynamic content</label>
              </li>
            </ul>
          </div>
          
          <div class="cta-box">
            <h3>Start Checking Your Core Web Vitals Today</h3>
            <p>By optimizing your Core Web Vitals, you'll not only improve search rankings but also significantly boost your click-through rates. Better user experience means more engagement, longer sessions, and higher conversion rates.</p>
            <a href="https://pagespeed.web.dev/" class="btn btn-primary btn-large" target="_blank" rel="noopener">Check Your Site Now</a>
          </div>
        </section>
      </article>
    </div>
  </div>
</div>

<style>
  .article-content {
    margin-top: 40px;
    margin-bottom: 60px;
  }
  
  .article-header {
    margin-bottom: 30px;
  }
  
  .article-header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 15px;
    color: #1e293b;
  }
  
  .meta-info {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    color: #64748b;
    font-size: 0.9rem;
  }
  
  .article-summary {
    background-color: #f8fafc;
    border-left: 4px solid #4a6ef5;
    padding: 20px;
    margin-bottom: 30px;
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  .table-of-contents {
    background-color: #f1f5f9;
    padding: 20px 30px;
    border-radius: 8px;
    margin-bottom: 40px;
  }
  
  .table-of-contents h2 {
    font-size: 1.4rem;
    margin-bottom: 15px;
  }
  
  .table-of-contents ol {
    padding-left: 20px;
  }
  
  .table-of-contents li {
    margin-bottom: 8px;
  }
  
  .table-of-contents a {
    color: #4a6ef5;
    text-decoration: none;
  }
  
  .table-of-contents a:hover {
    text-decoration: underline;
  }
  
  section {
    margin-bottom: 50px;
  }
  
  section h2 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 20px;
    color: #1e293b;
    padding-bottom: 10px;
    border-bottom: 2px solid #e2e8f0;
  }
  
  .metrics-overview {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .metric-card {
    display: flex;
    background-color: #ffffff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    border: 1px solid #e2e8f0;
  }
  
  .metric-icon {
    margin-right: 15px;
    font-size: 2rem;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .lcp-icon {
    background-color: #e0f2fe;
    color: #0284c7;
  }
  
  .fid-icon {
    background-color: #fef9c3;
    color: #ca8a04;
  }
  
  .cls-icon {
    background-color: #fce7f3;
    color: #db2777;
  }
  
  .metric-details h3 {
    font-size: 1.2rem;
    margin-top: 0;
    margin-bottom: 10px;
  }
  
  .metric-details p {
    margin: 5px 0;
    font-size: 0.95rem;
  }
  
  .impact-box {
    background-color: #f1f5f9;
    border-radius: 8px;
    padding: 20px;
    margin-top: 30px;
  }
  
  .impact-box h3 {
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 1.3rem;
  }
  
  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .tool-card {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    border: 1px solid #e2e8f0;
  }
  
  .tool-card h3 {
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 1.3rem;
  }
  
  .tool-screenshot {
    width: 100%;
    height: auto;
    border-radius: 4px;
    margin-bottom: 15px;
    border: 1px solid #e2e8f0;
  }
  
  .tool-tip {
    font-size: 0.9rem;
    margin-top: 15px;
    padding: 8px;
    background-color: #fffbeb;
    border-radius: 4px;
  }
  
  .code-block {
    margin-top: 30px;
    background-color: #1e293b;
    border-radius: 8px;
    padding: 20px;
    overflow: auto;
  }
  
  .code-block h3 {
    color: #f8fafc;
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 1.2rem;
  }
  
  .code-block p {
    color: #e2e8f0;
    margin-bottom: 15px;
  }
  
  .code-block pre {
    margin: 0;
  }
  
  .code-block code {
    color: #e2e8f0;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
  }
  
  .optimization-steps {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
  .step {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 25px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    border: 1px solid #e2e8f0;
  }
  
  .step h3 {
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 1.3rem;
    color: #1e293b;
  }
  
  .code-sample {
    margin-top: 20px;
    background-color: #f8fafc;
    border-radius: 8px;
    padding: 15px;
    overflow: auto;
    border: 1px solid #e2e8f0;
  }
  
  .code-sample pre {
    margin: 0;
  }
  
  .code-sample code {
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
  }
  
  .checklist-container {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    border: 1px solid #e2e8f0;
    margin-bottom: 40px;
  }
  
  .checklist-container h3 {
    margin-top: 25px;
    margin-bottom: 15px;
    font-size: 1.3rem;
    color: #1e293b;
  }
  
  .checklist-container h3:first-child {
    margin-top: 0;
  }
  
  .checklist {
    list-style: none;
    padding: 0;
  }
  
  .checklist li {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }
  
  .checklist input[type="checkbox"] {
    margin-right: 10px;
    width: 18px;
    height: 18px;
  }
  
  .cta-box {
    background-color: #eff6ff;
    border-radius: 8px;
    padding: 30px;
    text-align: center;
    margin-top: 40px;
  }
  
  .cta-box h3 {
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 1.5rem;
  }
  
  .btn-large {
    padding: 12px 24px;
    font-size: 1.1rem;
    margin-top: 15px;
  }
</style> 