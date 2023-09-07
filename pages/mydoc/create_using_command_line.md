---
title: Create a Github Repository using Command Line
keywords: [github create repository command line, how to create a repository in github from vscode, create a repo, creating a new repository, creating your first repository, how to create a github repository, start a new github repository, github repository example]
sidebar: sidebar
permalink: createrepocommandline.html
folder: mydoc
completed:
---

It's possible to create a GitHub repository from the command line using the GitHub API and a command-line tool called curl.

Here's the basic process for creating a repository:

1. First, you'll need to generate a personal access token (PAT) on GitHub. This token will be used to authenticate the API request. To create a PAT, go to your GitHub settings, select **Developer settings**, and then **Personal access tokens**. Create a new token with the appropriate permissions for creating a repository.

2. Once you have your PAT, you can use **`curl`** to create a new repository. The basic format for the command is:

    `curl -u <username> -d '{"name":"<repo_name>"}' https://api.github.com/user/repos`

    **Note:** In this command, you should replace **`<username>`** with your GitHub username, and **`<repo_name>`** with the name you want to give your repository.

3. If you don't want to use -u <username> then you can use -H "Authorization: token <PAT>"
   Here is an example:

   `curl -H "Authorization: token <PAT>" -d '{"name":"my_new_repo"}' https://api.github.com/user/repos`
    
    The `curl` command creates a new repository named my_new_repo on your GitHub account.

4. To create a private repository, you can add **`private`** to the JSON payload, like this:
   
    `curl -H "Authorization: token <PAT>" -d '{"name":"my_new_repo", "private": true}' https://api.github.com/user/repos` 

    This will create a private repository named **`my_new_repo`**.

    **Note:** You can use other options like **`-d '{"name":"<repo_name>", "description":"<description>"}'`** to add other properties like "description" etc.

This is a basic example of how to create a GitHub repository from the command line. There are other options you can use to customize the repository, such as setting the repository's description, making it private, and so on, you can find more information in the GitHub API documentation.