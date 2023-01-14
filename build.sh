#!/bin/bash
server="$(pwd)/server.js"

pm2 stop ${server} --killTree=false

git pull

npm install 

pm2 start ${server} --killTree=false

date >> "$(pwd)/buildLog.txt"
