# Remove duplicate snap app versions
#!/bin/sh
LANG=en_US.UTF-8 snap list --all | awk '/disabled/{print $1, $3}' |
while read pkg revision; do
    sudo snap remove "$pkg" --revision="$revision"
done

# Clear logs
sudo journalctl --vacuum-size=250M

# Show largest files/folders
# sudo du -sh /
