#!/bin/bash

echo Installation

source .env

if [ -z ${FAIRLYTICS_URL} ]
then
    echo "Error : \$FAIRLYTICS_URL is not set in the .env file"
    exit 1
fi

echo Fairlytics URL is set to ${FAIRLYTICS_URL}
echo ------------------------------------------
echo

echo "Generating tag.js from tag-template.js"
cp ./packages/webapp/public/tag/tag-template.js ./packages/webapp/public/tag/tag.js
TAG_URL_WITHOUT_SLASH=$(echo ${FAIRLYTICS_URL}/hit | sed -e "s#/#\\\/#g")
SED_REPLACE_STRING="s/@@TAG_URL@@/${TAG_URL_WITHOUT_SLASH}/g"
sed -i -e ${SED_REPLACE_STRING} packages/webapp/public/tag/tag.js

if [ -z ${ELASTIC_USERNAME} ]
then
    echo "Error : \$ELASTIC_USERNAME is not set in the .env file"
    exit 1
fi
if [ -z ${ELASTIC_PASSWORD} ]
then
    echo "Error : \$ELASTIC_PWD is not set in the .env file"
    exit 1
fi
if [ -z ${FAIRLYTICS_SQLITE_DB} ]
then
    echo "Error : \$FAIRLYTICS_SQLITE_DB is not set in the .env file"
    exit 1
fi

echo "Building website"
touch packages/webapp/.env
echo ELASTIC_USERNAME=${ELASTIC_USERNAME} > packages/webapp/.env
echo ELASTIC_PASSWORD=${ELASTIC_PASSWORD} >> packages/webapp/.env
echo ELASTIC_CERT=/app/certs/http_ca.crt >> packages/webapp/.env
echo NEXT_PUBLIC_FAIRLYTICS_URL=${FAIRLYTICS_URL} >> packages/webapp/.env
echo FAIRLYTICS_SQLITE_DB=${FAIRLYTICS_SQLITE_DB} >> packages/webapp/.env
docker build -f Dockerfile-webapp -t webapp-fairlytics  .

echo "Installing ElasticSearch"
make install-es
make create-index

echo "Starting..."
make start

echo "To send something to ElasticSearch : run make test"
