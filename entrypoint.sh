#!/usr/bin/env sh

npm run provision

if [ "$NEXT_ENV" = "development" ] 
then 
    npm run dev
else
    npm run start
fi