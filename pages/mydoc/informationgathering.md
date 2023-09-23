---
title: How do Technical Writers document an API?
keywords: [API documentation, API information gathering, API documentation best practices, API documentation tools, API documentation planning, API documentation structure, API documentation writing, API documentation testing, API documentation review, API documentation publishing, API documentation maintenance, API documentation improvement, Writing API documentation, Understanding API, Identifying target audience, Documentation goals, Gathering API information, Organizing documentation structure, Writing clear content, Including code samples, Testing API documentation, Seeking feedback on documentation, Publishing API documentation, Maintaining API documentation, Continuous improvement in documentation, Technical writing for APIs, API documentation platforms, Effective API documentation, User-friendly API documentation]
sidebar: sidebar
permalink: /informationgathering.html
folder: mydoc
completed: 5
next:
  url: https://beingtechnicalwriter.com/apidocumentation/typesofAPI.html
previous:
  url: https://beingtechnicalwriter.com/apidocumentation/whatisanAPI.html
---

API documentation is essential for helping users understand and use APIs effectively. However, writing good API documentation can be a challenging task. This chapter teaches you the best practices for writing API documentation, from understanding your audience to researching the API to testing your documentation.

{% include note.html content="If you're diving into this chapter and finding some of the technical terms a bit daunting, don't sweat it – that's perfectly fine! We haven't covered them yet, and my main goal in this chapter is to give you a sneak peek into how you will kickstart your journey in documenting APIs once you become an expert. As we progress through the course, we'll delve deep into the nitty-gritty details of these terms and technologies." %}

## 1. Understand the API: 

* Begin by thoroughly understanding the API's purpose, functionality, and the problem it solves. 

    - Understand how the API works. This includes understanding the different endpoints, the request and response parameters, and the error messages. 
    
    - You can learn about the API by reading the documentation that is already available, talking to the API developers, and testing the API yourself.

## 2. Determine Your Target Audience: 

* For whom are you creating the documentation? What are their wants and needs?

    - Consider who will be reading your documentation, such as engineers, product managers, and business analysts.
    
    - Determine their precise requirements and expectations. Developers, for example, will require more knowledge about the API's endpoints and parameters, but product managers may be more interested in the API's use cases and benefits.

## 3. Set Documentation Objectives:

* Clearly outline your documentation's aims and objectives. What should readers be able to do after reading it?

    - Your documentation should assist users in understanding how to utilize the API to achieve their objectives.
    - For example, one purpose of your documentation could be to assist users in getting started with the API, while another goal could be to assist them in troubleshooting typical issues.

## 4. Gather data: 

* Once you've identified your audience and documentation objectives, you can start obtaining API data.

    - To obtain important API information, work with Subject Matter Experts (SMEs) and other stakeholders.
    - Ask relevant questions.

    {% include example_dropdown.html %}

## 5. Plan Your Documentation Structure:

* Organize your documentation logically. Common sections include:

    - *Introduction:* Provide an overview of the API, its purpose, and its key features.
    - *Getting Started:* Explain how to get started with the API, such as how to create an account and obtain an API key.
    - *Authentication:* Explain how to authenticate with the API.
    - *API Endpoints and Methods:* Describe each endpoint of the API and the methods it supports.
    - *Examples and Use Cases:* Provide examples and use cases to show users how to use the API to achieve their goals.
    - *Error Handling:* Explain how to handle errors that may occur when using the API.
    - *Best Practices:* Provide best practices for using the API effectively.
    - *Frequently Asked Questions:* Answer common questions about the API.

## 6. Create Clear and Concise Content:

* As far as possible, use straightforward language and avoid jargon.
* Keep it short and to the point.
* Provide examples and code snippets to demonstrate subjects.
* Keep the tone and layout constant throughout.


## 7. Include Code Samples

* Developers often rely on code examples to understand how to use an API. Include clear and working code samples in multiple programming languages if possible.


## 8. Test the API:

* Test the API yourself to ensure that the documentation accurately reflects its behavior.
* Verify that code samples and examples work as expected.
* Document any known limitations or issues.

You can use a variety of tools to ensure the operation and dependability of an API when testing it. Some popular tools are:

- **Postman:** A sophisticated API testing tool that allows you to develop and perform automated API tests.

- **Swagger:** A RESTful API design, development, and documentation tool. It provides an interface for interactive API documentation.

- **cURL:** A command-line tool for testing API endpoints via HTTP queries.

- **Insomnia:** A cross-platform API testing tool with functions such as code snippet creation and request organization.

Make a test plan and run extensive tests to validate the API's functioning.


## 9. Review and Feedback:

* For feedback, share your documentation with your team, SMEs, and possibly a small group of external developers.
* Take opinions into consideration and make changes as needed.

## 10. Publish and Maintain:

* Select a platform to host your documentation (for example, Swagger, Postman, GitHub Pages, or a specific documentation tool).
* As the API evolves, keep the documentation up to current.
* Notify users of any major changes or upgrades.

## 11. Strive for Continuous Improvement:

* Gather feedback from users and stakeholders on a regular basis to improve the documentation over time. Keep abreast on industry best practices and emerging standards.

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