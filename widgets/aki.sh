#!/usr/bin/env bash

pipe=/tmp/aki-daemon.pipe

if [[ ! -p $pipe ]]; then
    echo "Reader not running"
    exit 1
fi


if [[ "$1" ]]; then
    echo "$1" >$pipe
