#!/bin/bash
mongod &
npm run build
npm run prod
cd /client/
npm start
