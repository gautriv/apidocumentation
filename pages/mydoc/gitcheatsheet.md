---
title: Git cheet sheet
keywords: [git cheat sheet, cheat sheet, git cherry pick commit from another branch, git rollback to previous commit, git move commit to another branch, git checkout specific commit, git undo local commit, git reset hard, git commit message, git commit and push, git commit history, git commit revert, git commit amend message
git commit undo, git commit empty, undo git commit, revert git commit, change git commit message
remove file from git commit, remove git commit, cherry pick git commit, revert to previous git commit
reset last git commit, checkout specific git commit, git revert commit, git undo commit, git revert last commit, git revert to previous commit, git change commit message, git cherry pick commit, git checkout commit, git reset last commit, git remove commit, git remove file from commit]
sidebar: sidebar
permalink: gitcheatsheet.html
folder: mydoc
summary: "This page provides all the commands we, the Technical Writers, use on almost daily basis."
---

I created this Git cheat sheet specifically for Technical Writers, and it includes only the commands that we use regularly.


<details>
  <summary>Branch</summary>
  <ul>
    <li><code>git branch</code>:  List all of the branches in your repository</li>
    <li><code>git branch "branch"</code>: Create a new branch called "branch". This does not check out the new branch.</li>
    <li><code>git branch -D "branch"</code>: Delete the specified branch. This is a “safe” operation in that Git prevents you from deleting the branch if it has unmerged changes. </li>
    <li><code>git branch -D "branch"</code>: Force delete the specified branch, even if it has unmerged changes. This is the command to use if you want to permanently throw away all of the commits associated with a particular line of development. </li>
    <li><code>git branch -m "branch"</code>: Rename the current branch to ＜branch＞. </li>
    <li><code>git branch -a</code> - List all remote branches. </li>
  </ul>
</details>

<details>
  <summary>Files</summary>
  <ul>

    <li><code>git add file</code>: This command stages a file for commit, adding it to the list of changes that will be committed when you run the git commit command.</li>

    <li><code>git rm file</code>: This command removes a file from the repository and stages the removal for commit.</li>

    <li><code>git reset file</code>: To remove a file that has been staged for commit in Git. Replace file with the name of the file you want to unstage. When you run this command, the file will be removed from the staging area and left in the working directory, but it will not be committed.</li>

    <li><code>git mv old_file new_file</code>: This command renames a file and stages the rename for commit.</li>

    <li><code>git checkout -- file</code>: This command discards changes to a file, reverting it to the version in the most recent commit.</li>

    <li><code>git commit -a</code>: This command commits all tracked changes, including modifications and deletions, but does not add new files that have not yet been staged.</li>

    <li><code>git stash</code>: This command temporarily saves changes that have not yet been staged and clears the staging area, allowing you to switch branches or restore the repository to a clean state.</li>

    <li><code>git stash apply</code>: This command restores changes that were previously stashed using the git stash command.</li>
  </ul>
</details>


<details>
  <summary>Commit</summary>
  <ul>
        <details>
            <summary>Generic Commit</summary>
            <ul>
                <li><code>git commit</code>: This command is used to commit changes to the local repository.</li>
                <li><code>git commit -a</code>: This command commits all tracked changes, including modifications and deletions, but does not add new files that have not yet been staged.</li>
                <li><code>git commit -m "message"</code>: This command commits changes and includes a commit message describing the changes.</li>
                <li><code>git commit --amend</code>: This command can be used to modify the most recent commit by adding to it or changing the commit message.</li>
                <li><code>git commit --amend -m "new message"</code>: This command can be used to modify the most recent commit and include a new commit message.</li>
                <li><code>git commit --no-edit</code>: This command can be used to commit changes and reuse the commit message from the previous commit.</li>
            </ul>
        </details>
        <details>
            <summary>Rolling back a commit</summary>
            <ul>
                <li><code>git revert commit_id</code>: This command creates a new commit that undoes the changes made in the specified commit. It does not permanently delete the commit, but rather creates a new commit that undoes the changes made in the original commit. You can run `git log` find the commit id.</li>

                <li><code>git reset "branch"</code>: This command moves the branch pointer to a previous commit and discards commits that occurred after that commit. It does not delete the commits permanently, but rather removes them from the current branch and places them in a separate "dangling" state where they are not accessible from any branch. You can also run `git log` find the commit id.</li>

                <li><code>git rebase -i "branch"</code>: This command opens an interactive rebase session, allowing you to edit, delete, or merge commits. It can be used to delete commits by removing them from the list of commits shown in the interactive rebase session. You can also run `git log` find the commit id.</li>

                <li><code>git push --force</code>: This command can be used to delete commits that have already been pushed to a remote repository. It works by forcibly replacing the remote repository's history with the local repository's history. This is generally considered a risky operation and should be used with caution.</li>
            </ul>
        </details>
        <details>
            <summary>Cherrypick a commit</summary>
            <ul>
            <li><code>git cherry-pick "branch"</code> - Cherry-pick a commit in Git. This command applies the changes made in a specific commit to the current branch, without merging the entire branch or merging the commit's parent commits. You can also run `git log` find the commit id.</li>
            </ul>
        </details>
    </ul>
</details>

