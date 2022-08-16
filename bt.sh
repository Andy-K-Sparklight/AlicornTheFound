#!/bin/sh
rm -rf ./dist
cp -r ./build ./dist
cp ./resources/index.html ./dist/index.html
cp ./resources/neutralino.js ./dist/neutralino.js
cp ./resources/icons/Icon.png ./dist/favicon.png
echo "Files copied."
