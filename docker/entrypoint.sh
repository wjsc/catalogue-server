#!/bin/bash
cd /var/www/catalogue_api/
npm install
pm2 start -x ./src/index.js --no-daemon --watch "./"

