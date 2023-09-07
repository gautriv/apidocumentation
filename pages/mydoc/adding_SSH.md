---
title: Setting up SSH Keys
keywords: [setting up ssh keys github, setting up ssh keys linux, setting up ssh keys gitlab, setting up ssh keys bitbucket, setting up ssh keys github windows, setting up ssh keys between two linux servers, setting up ssh keys windows, setting up ssh keys mac, setting up ssh keys in eclipse for gitssh keygen, ssh copy id, generate ssh key windows, generate ssh key ubuntu, generate ssh key linux, generate ssh key mac, ssh keygen rsa, copy ssh key]
sidebar: sidebar
permalink: setupssh.html
folder: mydoc
completed:
---

The next step after creating a respositorsy is to set up SSH (Secure Shell). SSH allows you to securely connect to remote servers and repositories, and can make it easier to authenticate with Git and push and pull changes to and from GitHub.

To set up SSH, you'll need to generate an SSH key pair on your local machine and add the public key to your GitHub account. Here are the steps you can follow to set up SSH:

## Generate an SSH key pair on your local machine

1. Open a terminal window and type the following command to generate a new SSH key:

   `ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`
        
2. Press Enter to accept the default file location for the key. You can also choose to specify a different location if you prefer.

3. When prompted, enter a passphrase for your key. This is an optional security measure that can help protect your key if it falls into the wrong hands.

## Add your private key to the ssh-agent

4. Start the ssh-agent in the background by typing the following command:

    `eval "$(ssh-agent -s)"`

5. Add your private key to the ssh-agent by typing the following command:

    `ssh-add ~/.ssh/id_rsa`

## Add your public key to your GitHub account:

6. View the contents of your public key by typing the following command:

    `cat ~/.ssh/id_rsa.pub`

    This will display the contents of your public key. Copy the key to your clipboard.

    {% include note.html content="To copy the content the id_rsa.pub file to your clipboard directly, you can also run the `clip ~/.ssh/id_rsa.pub`command." %}

7. Go to the GitHub website and log in to your account.

8. In the top-right corner of the page, click your profile icon and select **Settings** from the dropdown menu.

9. On the **Settings** page, select the **SSH and GPG keys** tab in the left sidebar.

10. Click the **New SSH key** button.

11. In the **Title** field, enter a name for your key. This could be the name of your computer or a description of the key.

12. In the **Key** field, paste the contents of your public key that you copied to your clipboard.

13. Click the **Add SSH key** button to save your key.

14. Optional: If prompted, enter your GitHub password to confirm the action.


## Test your SSH connection
   
1. To test your SSH connection to GitHub, type the following command:

    `ssh -T git@github.com`

    The system may display some warnings, but if your SSH connection is successful, you should see a message like this:

    `Hi username! You've successfully authenticated, but GitHub does not provide shell access.`

That's it! You've set up SSH, authenticated with GitHub, and added your SSH key to your account. Now you can use SSH to securely connect to your repositories and push and pull changes.

I hope these steps are helpful, and that you have a great time using Git and GitHub. Happy coding!