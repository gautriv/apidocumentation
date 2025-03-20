---
layout: chapter
title: "How the internet works?"
description: "Learn the fundamentals of how the internet works, from browser requests to server responses."
module_id: "introduction"
module_title: "Introduction to API Documentation"
chapter_number: 1
permalink: /howinternetworks.html
next_chapter: "/whatisanAPI.html"
next_title: "What is an API?"
module_chapters:
  - number: 1
    title: "How the internet works?"
    url: "/howinternetworks.html"
  - number: 2
    title: "What is an API?"
    url: "/whatisanAPI.html"
  - number: 3
    title: "What do Technical Writers Document in an API?"
    url: "/whatwritersdo.html"
  - number: 4
    title: "How do Technical Writers document an API?"
    url: "/howtechwritersdocument.html"
resources:
  - title: "API Glossary"
    url: "#"
  - title: "Web API Design Best Practices"
    url: "#"
---

<div class="chapter-section">
  <h2 id="internet-basics">Welcome to the Digital Jungle</h2>
  
  <p>Welcome to the digital jungle! You've probably used the internet a thousand times today already (yes, including right now). But have you ever wondered how this magic actually works? I mean, how does typing "funny panda GIFs" into your browser magically bring up exactly what you want?</p>
  
  <p>Think of your browser as your trusty sidekick, aiding you on a digital adventure. You've got questions, and the web holds the answers. But, how do they all communicate?</p>
  
  <div class="image-container">
    <img src="{{ "/assets/gif/commpone.gif" | relative_url }}" alt="Internet working phase one">
    <img src="{{ "/assets/gif/commptwo.gif" | relative_url }}" alt="Internet working phase one b">
  </div>
</div>

<div class="chapter-section">
  <h2 id="how-internet-works">The Internet Communication Process</h2>
  
  <h3>Step 1: Asking Nicely - Telling the Computer What You Want</h3>
  
  <p>Picture this: you're sitting on your couch, craving answers (or tacos, but let's stick with answers for now). You type something into your browser, like, "How do penguins flirt?" (Yes, they really do have moves.) Your browser nods, cracks its knuckles, and says, "Got it, boss!"</p>
  
  <p>Off it goes, sprinting to a server somewhere in the world to ask, "Hey, do you have any penguin flirting tips?" It's like your browser is that friend who always knows someone who knows someone who has what you need. The ultimate wingman.</p>
  
  <h3>Step 2: Proving You're You - Showing Your ID</h3>
  
  <p>But wait—before handing over the goods, the server might raise an eyebrow and ask, "Who are you, and how do I know you're not a robot?" Classic server skepticism.</p>
  
  <p>So, your browser turns to you and whispers, "Hey, they want proof. Give me your password." You oblige, typing in your super-secret code (hopefully not "password123"), and voilà—the server nods approvingly. "You're in. No robots allowed."</p>
  
  <h3>Step 3: Showing Your Secret Code - Giving Your Password</h3>
  
  <p>You type in your secret code (password), and your browser hands it to the server. If it checks out, the server says, "Alright, come on in!"</p>
</div>

<div class="chapter-section">
  <h2 id="server-database">Servers and Databases</h2>
  
  <h3>Step 4: The Great Info Hunt – Servers Do Their Thing</h3>
  
  <p>Now the server gets to work. It dives into its database, a huge digital filing cabinet, and searches for exactly what you asked for. Imagine a librarian sprinting through rows of books, muttering, "Penguins… penguins… ah, here it is!" The server grabs the info, wraps it up neatly, and sends it back to your browser. Mission accomplished.</p>
  
  <h3>Step 5: Making It Look Nice - Dressing Up the Info</h3>
  
  <p>When the info arrives, it's not exactly glamorous. Think plain, unseasoned tofu. That's where your browser's dream team—HTML, CSS, and JavaScript—comes in. These guys are like the Queer Eye of the internet. They take that plain data and transform it into a stunning, user-friendly webpage.</p>
  
  <p>Without them? Every site would look like a badly formatted Word document. Yikes.</p>
  
  <h3>Step 6: Magic Storage Place - Where Computers Keep Stuff</h3>
  
  <p>Behind the scenes, all the magic starts in the database—a giant vault of information. Imagine it as the Hogwarts library, minus the floating candles but with equally nerdy spells like SQL. Whenever the server needs something, it waves its wand (okay, it types a query), and poof—the info is retrieved. No owls required.</p>
  
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
</div>

<div class="chapter-section">
  <h2 id="api-introduction">The API: The Internet's Translator</h2>
  
  <h3>Step 7: Middleman Talk - Using a Translator (API)</h3>
  
  <p>Sometimes, your browser and the server need a helper to ensure everyone understands each other.</p>
  
  <p>Confused?</p>
  
  <p>Imagine your browser and the server are like two friends from different countries. They both want to chat and share information, but there's a language barrier. That's where our hero comes in – the API, short for Application Programming Interface.</p>
  
  <p>Think of the API as a clever translator, fluent in both "browser language" and "server language." Its job is to make sure your browser and the server can talk and understand each other effortlessly. It's like the helpful friend who steps in, ensuring smooth communication between two people who speak different languages.</p>
  
  <p>The API knows the rules of the game. It says, "Hey, browser, here's how the server likes to be spoken to," and vice versa. This way, your browser can ask for information, and the server can respond in a way that your browser can easily understand.</p>
  
  <p>In simple terms, the API is the bridge that helps different parts of the web world work together. Without this translator, your browser and the server might struggle to communicate effectively, and we wouldn't get the seamless online experience we've come to expect.</p>
  
  <div class="info-box">
    <h4>The Treasure Map – API Documentation</h4>
    <p>Now, APIs are amazing, but they're not mind readers. They need instructions—like a treasure map—to know what they're supposed to do. And that's where you come in. API documentation is the ultimate guide for developers, showing them how to use APIs to build cool stuff without breaking anything (hopefully).</p>
    <p>In this course, we're going to demystify how to write this magical map. By the end, you'll be an API documentation wizard, capable of guiding developers through the wildest API jungles. Ready to channel your inner Gandalf? Let's go!</p>
  </div>
</div>

<div class="chapter-section">
  <h2 id="chapter-summary">Chapter Summary</h2>
  
  <div class="chapter-takeaways">
    <h3 class="chapter-takeaways-header">Key Takeaways</h3>
    <div class="chapter-takeaways-content">
      <ul class="chapter-takeaways-list">
        <li>Your browser communicates with servers to fetch information.</li>
        <li>Internet requests follow a step-by-step process to retrieve data.</li>
        <li>Authentication verifies your identity online.</li>
        <li>Servers and databases store and retrieve information efficiently.</li>
        <li>HTML, CSS, and JavaScript transform raw data into interactive webpages.</li>
        <li>APIs act as translators between different systems, enabling seamless communication.</li>
        <li>API documentation is crucial for developers to understand and use APIs effectively.</li>
      </ul>
    </div>
  </div>

<br>

  
  <p>In the next chapter, we'll explore different types of APIs, focusing on their characteristics, use cases, and documentation approaches.</p>
</div> 