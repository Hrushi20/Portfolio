#!/bin/bash

# Makes the script run the current directory
cd "$(dirname "$0")"

server="$(pwd)/server.js"

git pull

npm install 

date >> "$(pwd)/buildLog.txt"

pm2 restart ${server}

