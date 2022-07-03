#!/bin/bash

### i3-gaps ###

# Meson build system
sudo apt-get install \
python3 python3-pip python3-setuptools \
python3-wheel ninja-build

sudo pip3 install meson

# i3-gaps dependencies
sudo apt-get install \
libxcb1-dev libxcb-keysyms1-dev libpango1.0-dev \
libxcb-util0-dev libxcb-icccm4-dev libyajl-dev \
libstartup-notification0-dev libxcb-randr0-dev \
libev-dev libxcb-cursor-dev libxcb-xinerama0-dev \
libxcb-xkb-dev libxkbcommon-dev libxkbcommon-x11-dev \
autoconf libxcb-xrm0 libxcb-xrm-dev automake libxcb-shape0-dev

# clone repo
rm -rf ~/.aki/.tmp/i3-gaps
git clone https://github.com/Airblader/i3 ~/.aki/.tmp/i3-gaps

cd ~/.aki/.tmp/i3-gaps

# build
mkdir -p build && cd build
meson ..
ninja
sudo ninja install

### feh (wallpaper) ###

sudo apt install feh

### polybar ###

sudo apt install polybar

### picom (transparency) ###

# sudo apt install picom

git clone https://github.com/jonaburg/picom ~/.aki/.tmp/picom

cd ~/.aki/.tmp/picom

sudo apt-get install \
libxext-dev libxcb1-dev libxcb-damage0-dev libxcb-xfixes0-dev \
libxcb-shape0-dev libxcb-render-util0-dev libxcb-render0-dev \
libxcb-randr0-dev libxcb-composite0-dev libxcb-image0-dev \
libxcb-present-dev libxcb-xinerama0-dev libxcb-glx0-dev \
libpixman-1-dev libdbus-1-dev libconfig-dev libgl1-mesa-dev \
libpcre2-dev libevdev-dev uthash-dev libev-dev libx11-xcb-dev

meson --buildtype=release . build

sudo ninja -C build

sudo ninja -C build install

### zsh + oh my zsh ###

sudo apt install zsh

sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

chsh -s $(which zsh)

### st (terminal) ###

sudo apt install build-essential libxft-dev libharfbuzz-dev

git clone https://git.suckless.org/st ~/.aki/.tmp/st

wget https://st.suckless.org/patches/scrollback/st-scrollback-0.8.5.diff -O ~/.aki/.tmp/st/st-scrollback-0.8.5.diff

cd ~/.aki/.tmp/st

patch -p1 < st-scrollback-0.8.5.diff

cd ~/.aki/.tmp/st

mv ~/.aki/.tmp/st/config.h ~/.aki/.tmp/st/config.h.bak
cp ~/.aki/.config/st/config.h ~/.aki/.tmp/st/config.h

sudo make clean install

### maim (screenshot) ###

sudo apt install maim

sudo apt install xclip

### rofi (window switcher) ###

sudo apt-get install rofi

### EWW ###

sudo apt-get install jq # JSON parser used in EWW widgets

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

source $HOME/.cargo/env

git clone https://github.com/elkowar/eww ~/.aki/.tmp/eww

cd ~/.aki/.tmp/eww

cargo build --release

mv target/release ~/aki/.bin/eww-release

chmod +x ~/aki/.bin/eww-release/eww

~/aki/.bin/eww-release/eww daemon