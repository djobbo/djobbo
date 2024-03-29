# picom (transparency) ###

# sudo apt install picom

# git clone https://github.com/jonaburg/picom ~/.aki/.tmp/picom
git clone https://github.com/dccsillag/picom ~/.aki/.tmp/picom

cd ~/.aki/.tmp/picom

git checkout implement-window-animations

sudo nala install \
libxext-dev libxcb1-dev libxcb-damage0-dev libxcb-xfixes0-dev \
libxcb-shape0-dev libxcb-render-util0-dev libxcb-render0-dev \
libxcb-randr0-dev libxcb-composite0-dev libxcb-image0-dev \
libxcb-present-dev libxcb-xinerama0-dev libxcb-glx0-dev \
libpixman-1-dev libdbus-1-dev libconfig-dev libgl1-mesa-dev \
libpcre2-dev libevdev-dev uthash-dev libev-dev libx11-xcb-dev

meson --buildtype=release . build

sudo ninja -C build

sudo ninja -C build install

rm -rf $AKI_PATH/.tmp/picom
