#!/bin/bash

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
