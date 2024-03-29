#! /bin/bash

# sudo nala remove discord -y || true

mkdir -p ~/.aki/.tmp

wget -O ~/.aki/.tmp/discord.deb "https://discord.com/api/download?platform=linux&format=deb"

sudo dpkg -i ~/.aki/.tmp/discord.deb

rm ~/.aki/.tmp/discord.deb

mkdir -p ~/.config/discord
ln -s $AKI_PATH/.config/discord/settings.json ~/.config/discord || true

# Try to install better discord when it'll be stable

# # Launch discord 1 time before injection for it to be successful
# nohup discord &
# discord_pid=$!
# sleep 7s
# kill -KILL $discord_pid

# git clone https://github.com/BetterDiscord/BetterDiscord.git ~/.aki/.tmp/BetterDiscord

# cd ~/.aki/.tmp/BetterDiscord

# # build works on node v16.x
# nvm install 16
# nvm use 16

# npm install

# npm run build

# npm run inject

# ln -s $AKI_PATH/.config/BetterDiscord ~/.config || true
