---
title: Git installation
keywords: [install git windows, install git ubuntu, install git linux, install git lfs, install git powershell, install git centos, install git debian, install git lfs ubuntu, install git windows 11, pip install git, brew install git, yum install git, conda install git, powershell install git, npm install git, choco install git, debian install git, apt install git, pkg install git, installing git
installation git windows, install pkg git, install github, install gitlab runner, install gitlab, 
install github cli]
sidebar: sidebar
permalink: installation.html
folder: mydoc
summary: This quickstart walks you through the steps required to install Git.
---

### Prerequisites

1. A working computer system that can handle Git.

### To install Git on Linux
1. Open your terminal and run `sudo dnf install Git-all`

    {% include note.html content="On a Debian-based distribution, such as Ubuntu, try `apt` instead of `dnf`" %}
2. Enter `Git --version`. The system displays the installed Git version.
   

### To install Git on MacOs
1. Open your terminal and run `Git --version`. If Git is not istalled, the system will automatically ask you to install it.
2. Enter `Git --version`. The system displays the installed Git version.


### To install Git on Windows

1. Browse to official [Git](https://Git-scm.com/download/win) website and download the software.

    {% include goodtoknow.html content="You can also use a package manager, for example, Chocolatey, to install Git on your system. If you want to use Chocolatey, you must first install [Chocolatey](https://chocolatey.org/install) and then on your terminal enter `choco install Git` " %}

2. Enter `Git --version`. The system displays the installed Git version.

3. On your terminal or powershell enter `Git --version`. The system displays the installed Git version.

Congratulations! You have installed Git and are ready for next adventures. If you have questions, let me know in the comments section.

## What's next?
[Set up Git - A guide to set up your git identity, editor, and branch](/gitsetup.md)