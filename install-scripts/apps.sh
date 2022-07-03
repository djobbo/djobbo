#!/bin/bash

sudo apt update

sudo apt upgrade

### Brave Browser ###

sudo apt install apt-transport-https curl

sudo curl -fsSLo /usr/share/keyrings/brave-browser-archive-keyring.gpg https://brave-browser-apt-release.s3.brave.com/brave-browser-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/brave-browser-archive-keyring.gpg arch=amd64] https://brave-browser-apt-release.s3.brave.com/ stable main"|sudo tee /etc/apt/sources.list.d/brave-browser-release.list

sudo apt install brave-browser

### VS Code ###

mkdir -p ~/.aki/.tmp

wget -O ~/.aki/.tmp/vscode.deb "https://code.visualstudio.com/sha/download?build=stable&os=linux-deb-x64"

sudo dpkg -i ~/.aki/.tmp/vscode.deb

### Lutris (Run windows apps) ###

sudo add-apt-repository ppa:lutris-team/lutris

sudo apt update

sudo apt install lutris