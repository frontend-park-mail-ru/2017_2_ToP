#!/bin/bash

rm -rf ./built
rm -rf ./index.html
rm -rf ./static

tar -xzf package.tgz
rm package.tgz

mv -f archive/* ./

rm -rf archive