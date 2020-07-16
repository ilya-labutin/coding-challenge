#!/usr/bin/env sh

echo "$NEXT_ENV"

if [ "$NEXT_ENV" = "development" ] 
then 
    echo "npm install"
    npm install
else
    echo "npm install --production"
    npm install --production
fi