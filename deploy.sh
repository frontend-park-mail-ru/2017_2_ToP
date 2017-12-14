#!/bin/bash

rm -rf public/

tar -xzf package.tgz
rm package.tgz

mv -f archive/public ./

rm -rf archive