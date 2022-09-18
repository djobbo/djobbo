#!/usr/bin/env bash

NVM_VERSION=v0.39.1

INSTALL_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

echo "Installing Aki..."
echo "Install directory: $INSTALL_DIR"
echo "Preparing environment..."

echo "Installing nala, curl and wget"

# Install Nala
sudo apt install nala
sudo nala fetch

sudo nala install curl wget

echo "Installing nvm..."

# Install nvm, pnpm and yarn
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/$NVM_VERSION/install.sh | bash

nvm install node

npm install -g pnpm yarn

cd $INSTALL_DIR

echo "Starting installation..."
# Launch install scripts
pnpm _install
