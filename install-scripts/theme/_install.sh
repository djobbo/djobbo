#! /bin/bash

# TODO: re-add apps scripts

### i3-gaps ###

### feh (wallpaper) ###

sudo apt-get install -y feh

### picom (transparency) ###

### zsh + oh my zsh ###

### st (terminal) ###

### maim (screenshot) ###

sudo apt-get install -y maim xclip

### rofi (window switcher) ###

sudo apt-get install -y rofi

### EWW ###

### Kitty ###

curl -L https://sw.kovidgoyal.net/kitty/installer.sh | sh /dev/stdin

ln -s ~/.local/kitty.app/bin/kitty ~/.local/bin || true
ln -s $AKI_PATH/.config/kitty ~/.config || true