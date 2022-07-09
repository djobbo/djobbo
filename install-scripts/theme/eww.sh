#!/bin/bash

### EWW ###

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

source $HOME/.cargo/env

sudo apt-get install jq # JSON parser used in EWW widgets

sudo apt-get install playerctl # Get song info from Spotify

git clone https://github.com/elkowar/eww ~/.aki/.tmp/eww

cd ~/.aki/.tmp/eww

cargo build --release

mv target/release ~/aki/.bin/eww-release

chmod +x ~/aki/.bin/eww-release/eww

~/aki/.bin/eww-release/eww daemon
