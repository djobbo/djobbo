#!/bin/bash

sudo apt update

sudo apt upgrade

### VS Code ###

mkdir -p ~/.aki/.tmp

wget -O ~/.aki/.tmp/vscode.deb "https://code.visualstudio.com/sha/download?build=stable&os=linux-deb-x64"

sudo dpkg -i ~/.aki/.tmp/vscode.deb

### Spotify ###

curl -sS https://download.spotify.com/debian/pubkey_5E3C45D7B312C643.gpg | sudo apt-key add -
echo "deb http://repository.spotify.com stable non-free" | sudo tee /etc/apt/sources.list.d/spotify.list
sudo apt-get update && sudo apt-get install spotify-client

sudo chmod a+wr /usr/share/spotify
sudo chmod a+wr /usr/share/spotify/Apps -R

# Spicetify
curl -fsSL https://raw.githubusercontent.com/spicetify/spicetify-cli/master/install.sh | sh
curl -fsSL https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/resources/install.sh | sh
curl -fsSL https://raw.githubusercontent.com/NYRI4/Comfy-spicetify/main/install.sh | sh

### OBS ###
sudo apt install obs-studio
