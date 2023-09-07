---
title: Set up a Git repository - A guide to set up your git repository
keywords: [how to set up a git repository locally, how to set up a remote git repository, how to set up a bare git repository, how to set up a shared git repository, how to set up a private git repository, how to set up a git repository, how to set up a git repository on windows, setting up a git repository, github create repository command line, git clone, git remote add, git init, git create repository from terminal, github repository, github repository example, gh repo create]
sidebar: sidebar
permalink: firstgitcommand.html
folder: mydoc
summary: "This page provides information on initializing a git repository."
---


### What is a Git repository?
A repository (or "repo") is a collection of files and directories that are tracked by Git. It's time to set up a Git repository.  There are two methods for setting up a Git repository, which we will discuss in detail.

### Prerequisites
1. A text editor. Going by the trend, I'll be using [Visual Studio Code](https://code.visualstudio.com/download). However, this does not mean that you have to use Visual Studio Code. You can use the code editor of your choice.

### Method 1 
1. Create a folder at your preferred location.
    {% include note.html content=" For example purposes, I created a folder (GitCommand) on Desktop." %}
2. Open the folder GitCommand on Visual Studio Code.
3. Create a file, **index.html**.
4. Copy and paste the following code into your index.html file.
    ```sh
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My first git command</title>
      </head>
      <body>   
    </body>
    </html>

    ```
5. Browse to **View > Terminal** to open the terminal.
6. Enter `git status`. What does the system display?
   {% include goodtoknow.html content=" Since this is the first time you use a git command on your directory (folder), the system displays _fatal: Not a git repository (or any of the parent directories): .git_ message. This message means that Git cannot recognize this directory. That gives us our next task. To ensure that Git recognizes our directory, we must initialize it." %}
7. Run `git init`. What does the system display?
      {% include note.html content="`git init` converts any directory into a Git repository. When you create a git repository, you can also create an initial branch. By default, git initializes a repository to the master branch. You can, however, choose in which branch you want to initialize the repository. If you wish to initialize the repository to the main branch, run `git init -b main`. Do not worry if you know nothing about branches in Git; I've covered these concepts later in the course." %}

      {% include important.html content="The system displays an error message if you run `git init -b main` after `git init` since you have already initialized the repository. To run the `git init -b main` command, first delete the Git folder from your GitCommand folder and try again." %}

8. Browse to your GitCommands folder on your Desktop. Do you see a **.git** folder inside with an index.html file?
      {% include goodtoknow.html content="Git generates a hidden directory named. git. This directory maintains all of the objects and references created and used by Git as part of your project's history." %}


### Method 2

1. Open Visual Studio Code and browse to **View > Terminal** to open the terminal.
2. On the Terminal enter `git init GitCommand`. This command creates a new directory called **GitCommand** and initialize it as a Git repository. 

### To recap, you've learned how to:
* Initialize a git repository

Congratulations! You now know how to initialize a git repository. Isn't it simple? If you have questions, let me know in the comments section.

## What's next?
[Git branches](/branches.md)
