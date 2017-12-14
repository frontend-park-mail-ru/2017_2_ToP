#!/bin/bash

rm -rf src/

tar -xzf package.tgz
rm package.tgz

mv -f archive/src ./

rm -rf archive