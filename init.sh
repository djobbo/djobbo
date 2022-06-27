AKI_PATH=~/.aki

mkdir -p ~/.config/
mkdir -p ~/.config/i3/
mkdir -p ~/.config/rofi

ln -s -f $AKI_PATH/.profile ~/.profile
ln -s -f $AKI_PATH/.config/i3/config ~/.config/i3/config
ln -s -f $AKI_PATH/.zshrc ~/.zshrc
ln -s -f $AKI_PATH/theme/aki.zsh-theme ~/.oh-my-zsh/custom/themes/aki.zsh-theme
ln -s -f $AKI_PATH/.config/rofi ~/.config/rofi/config.rasi
