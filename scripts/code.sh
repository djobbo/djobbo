#!/bin/bash

sudo apt update

sudo apt upgrade

### NodeJS ###

sudo apt install curl

curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

nvm install node

npm install -g pnpm yarn

### Docker ###

# https://docs.docker.com/engine/install/ubuntu/

sudo apt update

sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

sudo mkdir -p /etc/apt/keyrings

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

apt-cache madison docker-ce

sudo docker run hello-world

### Python 3 ###

sudo apt-get install python3 python3-pip