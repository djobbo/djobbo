#!/bin/bash

### Fira Code ###

sudo apt-get update

sudo apt-get install unzip

wget -O ~/.aki/.tmp/FiraCode.zip "https://github.com/ryanoasis/nerd-fonts/releases/download/v2.1.0/FiraCode.zip"

mkdir -p ~/.fonts

unzip ~/.aki/.tmp/FiraCode.zip  -d ~/.fonts