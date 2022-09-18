# Ungoogled Chromium
# https://github.com/ungoogled-software/ungoogled-chromium-debian

# Install initial packages
sudo apt install -y devscripts equivs

# Clone repository and switch to it (optional if are already in it)
git clone https://github.com/ungoogled-software/ungoogled-chromium-debian.git "/mnt/data_2/.tmp/ungoogled-chromium-debian"
cd "/mnt/data_2/.tmp/ungoogled-chromium-debian"

# Initiate the submodules (optional if they are already initiated)
git submodule update --init --recursive

# Prepare the local source
debian/rules setup

# Install missing packages
sudo mk-build-deps -i debian/control
rm ungoogled-chromium-build-deps_*

# Build the package
dpkg-buildpackage -b -uc