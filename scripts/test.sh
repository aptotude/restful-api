#!/bin/bash
set -e

if [ -f settings.test.sh ]; then
  . settings.test.sh
elif [ -f settings.sh ]; then
  . settings.sh
else
  echo "No settings.sh file found."
  exit 1
fi

mocha dist/test --opts dist/test/mocha.opts --exit
