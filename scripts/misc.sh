#!/bin/bash

### Google DNS ###

# list connections
nmcli con

# TODO: grep connection names

# Set Google DNS

nmcli connection modify $connectionName ipv4.dns "8.8.8.8,8.8.4.4"

# restart connection

nmcli con down $connectionName

nmcli con up $connectionName