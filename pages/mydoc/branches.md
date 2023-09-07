---
title: Git branches
keywords: [git branches list, git create branch, git change branch, git checkout, git branch command, best way to manage git branches, git checkout branch, git branching strategy]
sidebar: sidebar
permalink: gitbranches.html
folder: mydoc
summary: "This page provides information on creating git branches."
---

In Git, a branch is a separate line of development. By default, every repository has a "master" branch, which is the main branch. You can create new branches to work on new features or make experimental changes without affecting the main branch.

* To create a new branch, run the `git branch` command followed by the name of the new branch. For example, `git branch new-feature`.

This will create a new branch called "new-feature" that is based off the current branch (which is usually the "master" branch).

To switch to a different branch, use the git checkout command followed by the name of the branch. For example, `git checkout new-feature`. This will switch the current branch to the **new-feature** branch. You can then make changes to the files in the repository and commit those changes to the "new-feature" branch.

It's also possible to create a new branch and switch to it in one command running the `git checkout -b` command. For example, `git checkout -b new-feature`.

To review all the branches that you've created till date, run the `git branch` command

### To recap, you've learned how to:

* Create a new git branch

Congratulations!
If you have questions, let me know in the comments section.

## What's next?
[Adding files to Git](/addingfiles.md)

## More commands on branches
[Git cheat sheet](/cheatsheet.md)