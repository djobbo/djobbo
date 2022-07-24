#!/bin/bash

AKI_PATH=~/.aki

# Create .bin folder for binaries built from source
mkdir -p $AKI_PATH/.bin

# Create symlinks
ln -s $AKI_PATH/.profile ~/.profile || true
ln -s $AKI_PATH/.zshrc ~/.zshrc || true
ln -s $AKI_PATH/.bashrc ~/.bashrc || true
ln -s $AKI_PATH/theme/aki.zsh-theme ~/.oh-my-zsh/custom/themes/aki.zsh-theme || true
ln -s $AKI_PATH/.config/i3/config ~/.config/i3/config || true
ln -s $AKI_PATH/.config/rofi ~/.config/rofi || true
ln -s $AKI_PATH/.config/eww ~/.config || true
ln -s $AKI_PATH/.config/BetterDiscord ~/.config || true
ln -s $AKI_PATH/.config/discord/settings.json ~/.config/discord || true
ln -s $AKI_PATH/.config/qtile ~/.config || true
