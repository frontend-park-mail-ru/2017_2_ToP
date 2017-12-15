#!/bin/bash

rm -rf ./*

tar -xzf package.tgz
rm package.tgz

mv -f archive/* ./

rm -rf archive