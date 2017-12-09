#!/bin/bash
cd /var/www/catalogue_api/
npm install
pm2 --name catalogue_api start -x src/index.js --no-daemon --watch "./src"

