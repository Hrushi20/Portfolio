#!/bin/bash

# Makes the script run the current directory
cd "$(dirname "$0")"

server="$(pwd)/server.js"

git pull

npm install 

pm2 restart ${server}

date >> "$(pwd)/buildLog.txt"
