#!/bin/bash

### EWW ###

### --- first install --- ###

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

source $HOME/.cargo/env

sudo apt-get install jq # JSON parser used in EWW widgets

sudo apt-get install playerctl # Get song info from Spotify

mkdir -p $AKI_PATH/.tmp

git clone https://github.com/elkowar/eww $AKI_PATH/.tmp/eww || true

### --- update --- ###

cd $AKI_PATH/.tmp/eww

git pull

cargo build --release

mkdir -p $AKI_PATH/.bin

mv target/release/eww $AKI_PATH/.bin/eww

chmod +x $AKI_PATH/.bin/eww

sudo ln -s $AKI_PATH/.bin/eww /usr/bin || true

rm -rf $AKI_PATH/.tmp/eww

eww daemon
