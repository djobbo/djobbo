#! /bin/bash

mkdir -p ~/.aki/.tmp

wget -O ~/.aki/.tmp/discord.deb "https://discord.com/api/download?platform=linux&format=deb"

sudo dpkg -i ~/.aki/.tmp/discord.deb

git clone https://github.com/BetterDiscord/BetterDiscord.git ~/.aki/.tmp/BetterDiscord

cd ~/.aki/.tmp/BetterDiscord

# build works on node v14.x
nvm use 14

npm install

npm run build

npm run inject
