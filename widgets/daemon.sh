#!/usr/bin/env bash

pipe=/tmp/aki-daemon.pipe

echo 'BRUH'

if [[ ! -p $pipe ]]; then
    mkfifo $pipe
fi

while true
do
    if read line <$pipe; then
        echo $line
    fi
done
