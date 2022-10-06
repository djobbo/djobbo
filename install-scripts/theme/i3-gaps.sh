#!/bin/bash

# Meson build system
sudo nala install \
python3 python3-pip python3-setuptools \
python3-wheel ninja-build

sudo pip3 install meson

# i3-gaps dependencies
sudo nala install \
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