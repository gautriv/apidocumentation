---
title: Git commit
keywords: [git cherry pick commit from another branch, git rollback to previous commit, git move commit to another branch, git checkout specific commit, git undo local commit, git reset hard, git commit message, git commit and push, git commit history, git commit revert, git commit amend message
git commit undo, git commit empty, undo git commit, revert git commit, change git commit message
remove file from git commit, remove git commit, cherry pick git commit, revert to previous git commit
reset last git commit, checkout specific git commit, git revert commit, git undo commit, git revert last commit, git revert to previous commit, git change commit message, git cherry pick commit, git checkout commit, git reset last commit, git remove commit, git remove file from commit]
sidebar: sidebar
permalink: gitcommit.html
folder: mydoc
summary: "This page provides information on commiting changes in Git."
---

Once you have a repository set up, you can make changes to the files and track those changes using Git. To do this, you will need to **commit** your changes. A commit is a snapshot of the repository at a particular point in time.

* To commit changes, use the `git commit` command in the terminal. For example, `git commit -m "added new feature"`

    {% include note.html content="The -m flag specifies a commit message, which is a brief description of the changes you made. It's good practice to include a commit message with every commit." %}

## Viewing history
* To view the commit history of a repository, you can use the `git log` command.
  
    {% include note.html content="This will show you a list of all the commits made to the repository, along with the commit message and the author of the commit." %}

## Undoing changes
Git provides several ways to undo changes you've made to a repository.

* The `git revert` command allows you to undo a specific commit by creating a new commit that undoes the changes made in the previous commit.

* The `git reset` command allows you to undo commits by moving the current branch pointer to a previous commit. This will discard commits that occurred after the specified commit.

### To recap, you've learned how to:

* Commit your changes
  
* View history
  
* Undo changes in git

Congratulations!

If you have questions, let me know in the comments section.

## What's next?
[The mash-up ](/gitcommit.md)

## More commands on commit
[Git cheat sheet](/cheatsheet.md)