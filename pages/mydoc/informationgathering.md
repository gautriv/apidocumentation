---
title: How do Technical Writers document an API?
keywords: [API documentation, API information gathering, API documentation best practices, API documentation tools, API documentation planning, API documentation structure, API documentation writing, API documentation testing, API documentation review, API documentation publishing, API documentation maintenance, API documentation improvement, Writing API documentation, Understanding API, Identifying target audience, Documentation goals, Gathering API information, Organizing documentation structure, Writing clear content, Including code samples, Testing API documentation, Seeking feedback on documentation, Publishing API documentation, Maintaining API documentation, Continuous improvement in documentation, Technical writing for APIs, API documentation platforms, Effective API documentation, User-friendly API documentation]
sidebar: sidebar
permalink: /informationgathering.html
folder: mydoc
completed: 10
next:
  url: https://beingtechnicalwriter.com/apidocumentation/typesofAPI.html
previous:
  url: https://beingtechnicalwriter.com/apidocumentation/whatisanAPI.html
---

API documentation is essential for helping users understand and use APIs effectively. However, writing good API documentation can be a challenging task. This chapter will teach you the best practices for writing API documentation, from understanding your audience to researching the API to testing your documentation.

{% include note.html content="If you’re diving into this chapter and finding some of the technical terms a bit daunting, don’t sweat it—that’s perfectly fine! We haven’t covered them yet, and my main goal in this chapter is to give you a sneak peek into how you’ll kickstart your journey in documenting APIs once you become an expert. As we progress through the course, we’ll delve deep into the nitty-gritty details of these terms and technologies." %}

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

## 1. Understand the API

Imagine this: You’re handed a mysterious gadget. It’s shiny, looks powerful, but you have no idea what it does. What’s the first thing you’d do? Yep, figure out what it’s for!

APIs are like that gadget—they solve specific problems and serve specific purposes. Your job is to understand what the API does, how it works, and why it’s awesome.

- **Ask Questions!** What’s the API’s purpose? What problems does it solve? Who uses it?
- Get your hands dirty! Test the API yourself, chat with developers, and dive into any existing documentation (even if it’s messy—this is where you shine!).
- Pro tip: Don’t be afraid to ask “silly” questions. Some of the best documentation starts with, “What the heck does this do?”


## 2. Know Your Audience

Let’s pause for a moment. You’re not just writing for the sake of writing. You’re creating something that real people—developers, product managers, or analysts—will use. So, let’s figure out who these people are.

- **Developers:** They want the details. Endpoints, parameters, authentication—give them all the nuts and bolts.
- **Product Managers:** They’re more interested in the big picture. How will this API improve the product? What are the use cases?
- **Business Analysts:** They might want a mix—some functionality details, but also how this API solves business problems.

Think of it like planning a speech: Are you talking to a room full of tech wizards or a group of curious business folks? Tailor your tone and content accordingly.


## 3. Set Goals

Imagine being handed a map with no “X marks the spot.” Frustrating, right? That’s why you need to set clear goals for your documentation.

Ask yourself:
- What should someone be able to do after reading this?
- Should they be able to make their first API call? Understand common errors? Master advanced features?

For example:
- Goal 1: Help users get started with the API in under 10 minutes.
- Goal 2: Reduce support tickets by clearly documenting error messages.

When you know your goals, the documentation practically writes itself (okay, not quite, but it helps a ton).

## 4. Gather information (The detective work begins) 

* Once you've identified your audience and documentation objectives, you can start obtaining API data.

    - To obtain important API information, work with Subject Matter Experts (SMEs) and other stakeholders.
    - Ask relevant questions.

    {% include example_dropdown.html %}

## 5. Plan Your Structure

Think of your documentation like a house. You need a solid foundation and clear rooms where everything belongs. Here’s a tried-and-true structure:

1. **Introduction:** What’s the API about? Why should users care?
2. **Getting Started:** How to sign up, get an API key, and make the first request.
3. **Authentication:** Explain the security basics (e.g., API keys, OAuth).
4. **Endpoints and Methods:** Break down each endpoint with supported methods (GET, POST, etc.).
5. **Examples and Use Cases:** Real-world examples that show users how to achieve their goals.
6. **Error Handling:** Common errors and how to fix them.
7. **Best Practices:** Tips for using the API effectively.
8. **FAQs:** Answer the most common questions.

If that seems like a lot, don’t worry! Start simple, then expand as you go.

## 6. Write Clearly and Concisely (Keep it simple)

Good documentation isn’t about sounding smart—it’s about being understood. Here’s how to do that:

- Use plain language. If you can say something in 10 words instead of 20, do it.
- Avoid jargon. If you must use technical terms, explain them.
- Add examples! A single example can clarify what 10 paragraphs of text can’t.
- Keep your tone consistent. If your introduction is friendly, don’t suddenly turn robotic in the error handling section.

---

## 7. Include Code Samples

Want to win the hearts of developers? Give them working code samples. Think of it as giving them a recipe instead of just describing the dish.

- Include samples in multiple programming languages if possible (e.g., Python, JavaScript, Java).
- Test the samples yourself to make sure they work.
- Use comments in the code to explain what’s happening.

## 8. Test the API (Become the User)

Here’s a secret: Testing the API yourself isn’t just helpful—it’s *essential*. By putting yourself in the user’s shoes, you’ll catch errors, clarify steps, and build empathy for their experience.

### Tools to Try:
- **Postman:** Great for testing and visualizing API requests.
- **Swagger:** Handy for interactive API documentation.
- **cURL:** Perfect for command-line testing.
- **Insomnia:** A lightweight, user-friendly API testing tool.

Create a simple test plan and run through every scenario. If something feels confusing to you, it’ll definitely confuse your users.

Make a test plan and run extensive tests to validate the API's functioning.

## 9. Review and Gather Feedback

Writing is only half the battle—getting feedback is where the magic happens.

- Share your draft with developers, SMEs, or even a small group of external users.
- Ask questions like:
  - “Does this make sense?”
  - “Are the examples helpful?”
  - “What’s missing?”

Be open to constructive criticism. Every bit of feedback makes your documentation stronger.

## 10. Publish and Maintain

Congrats! You’ve written amazing API documentation. Now, it’s time to share it with the world.

- Choose a platform to host it (e.g., Swagger, Postman, GitHub Pages).
- Update it regularly. APIs evolve, and your documentation should, too.
- Notify users of major changes. A quick email or update log goes a long way.

Keep in mind that proper API documentation is an ongoing process. It should change in tandem with the API and your users' requirements. Update and improve your documentation on a regular basis to ensure it stays a helpful resource for developers.

{% include recap.html content="The main takeaways from this chapter are:
<br>
--> Understand the API thoroughly.
<br>
--> Identify your audience and their specific needs.
<br>
--> Set clear documentation goals.
<br>
--> Gather information from SMEs and stakeholders.
<br>
--> Plan a logical documentation structure.
<br>
--> Write clear, concise content with examples.
<br>
--> Include working code samples.
<br>
--> Test the API, verify code samples, and document limitations.
<br>
--> Seek feedback and make revisions.
<br>
--> Publish on a suitable platform and maintain updates.
<br>
--> Continuously improve based on user feedback and industry standards.
" %}