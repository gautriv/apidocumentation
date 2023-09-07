---
title: Set up Git - A guide to set up your git identity, editor, and branch
keywords: [set up git, set up git on windows, set up git ssh, set up git on mac, set up git repository, set up git credentials, set up git server, set up git ssh key, set up git bash
set up git remote, how to set up git server on local network, how to set up git bash, how to set up git in vs code]
sidebar: sidebar
permalink: setupgit.html
folder: mydoc
summary: "This page provides information on setting your identity, default editor, and branch."
---

We’ve already talked about how to install Git. Our next logical step is to customize the Git environment to ensure that it’s ready for our use.

# Setting up Git up for general usage

Customization of Git environment involves:
1. Setting up your identity
   1. Username
   2. Email Address

2. Setting up default editor
3. Setting up default branch name

## Setting up your identity
The world recognizes you based on your name and actions. How do you think Git will know about them? You need to inform Git about your username and email address. Git uses this information to give identity to your commits.

Oh right, you don’t know about commits yet. No worries, we will talk about it later. But, for now, remember that you need to inform Git about yourself, and it needs just two things - username and email address.

### How to set up username and email address?

1. Open your terminal (not matter which OS you use).
2. Run the following commands:
   
   `git config --global user.name "Your Name"`

   `git config --global user.email "youremail@example.com"`

3. Run the following command to review the information that you just entered:
   
   `git config --list`

{% include goodtoknow.html content="If you use  `--global` in your commands, you only need to do this once because then Git will always use this information no matter what you do on your system. If you want to override your username and email address for specific projects, run the command without the `--global` option while in that project." %}

## Setting up default editor
Now, Git knows who you are. Therefore, it’s time to tell Git what kind of editor you like, otherwise it will use the system’s default editor.

### How to set up deafult editor?
1. Open your terminal.
2. Run the following commands:
   
   `git config --global core.editor nameofyoureditor`

   For example, `git config --global core.editor atom`

    {% include note.html content="If you are on Windows, you need to specify the full path of your favourite editor's executable (.exe) file" %}

3. Run the following command to review the information that you just entered:
   
   `git config --list`

## Setting up default branch name
So now Git knows about you and your favorite text editor. It’s time to inform Git about the default branch name, otherwise Git will create a master branch when you create [(initialize) a new Git repository](firstcommand.md).

### How to set up deafult editor?
1. Open your terminal.
2. Run the following command:
   
   `git config --global init.defaultBranch main`

    {% include note.html content="You must set `main` as your default branch" %}

3. Run the following command to review the information that you just entered:
   
   `git config --list`

Congratulations!

Git is now ready for use. If you have questions, let me know in the comments section.

## What's next?
[Set up a Git repository - A guide to set up your git repository](/firstcommand.md)
