---
title: Adding files to Git
keywords: [how to upload files to github repository command line, git commit, git add, git add file example, git add folder, git add file command, git add file to commit, git add all]
sidebar: sidebar
permalink: addingfiles.html
folder: mydoc
summary: "This page provides information on adding files to git."
---

The `git add` command allows you to add one or more files to the staging area, which is a temporary holding area for changes that you want to commit. Let's create some files in our project that we can then add to Git.

1. Let's create two files **file1.txt file2.txt** in our project.
2. Open the terminal and run the `git add` command. For example, `git add file1.txt file2.txt`. 

    {% include note.html content="You can also run the `git add --all` command to add all the files in a directory. This will add all the modified and untracked files in the current directory and its subdirectories to the staging area. It's important to note that the git add command only adds the changes to the staging area. The changes are not actually committed to the repository until you use the `git commit` command." %}


### To recap, you've learned how to:
* Add files to git

Congratulations! 
If you have questions, let me know in the comments section.


## What's next?
[Commit files to Git ](/gitcommit.md)

## More commands on files
[Git cheat sheet](/cheatsheet.md)