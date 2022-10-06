#!/usr/bin/env bash

mkdir -p ~/.aki/.tmp

git clone https://github.com/deter0/xborder ~/.aki/.tmp/xborder
cd ~/.aki/.tmp/xborder
pip install -r requirements.txt

mv ~/.aki/.tmp/xborder/xborders ~/.aki/.bin/xborders
chmod +x ~/.aki/.bin/xborders
xborders --help

rm -rf ~/.aki/.tmp/xborder
