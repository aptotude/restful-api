#!/bin/bash
set -e

if [ -f settings.sh ]; then
  . settings.sh
else
  echo "No settings.sh file found."
  exit 1
fi

node dist/index.js
