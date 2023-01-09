#!/bin/bash

echo Installation

source .env

if type lsb_release >/dev/null 2>&1; then
    # linuxbase.org
    OS=$(lsb_release -si)
    VER=$(lsb_release -sr)
else
    # Fall back to uname, e.g. "Linux <version>", also works for BSD, etc.
    OS=$(uname -s)
    VER=$(uname -r)
fi

echo "$OS"

if [ "$OS" = "Debian" ]
then
    echo "Setting vm.max_map_count for Linux Debian"
    sudo sysctl -w vm.max_map_count=262144
fi

if [ "$OS" = "Ubuntu" ]
then
    echo "Setting vm.max_map_count for Linux Ubuntu"
    sudo sysctl -w vm.max_map_count=262144
fi


if [ "$OS" = "Darwin" ]
then
    echo "Happy to have a Mac"
fi

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

echo "Building webapp"
mkdir -p ./db
mkdir -p ./certificats
cp ./nginx/nginx.conf.http ./nginx/nginx.conf 
touch packages/webapp/.env
echo ELASTIC_USERNAME=${ELASTIC_USERNAME} > packages/webapp/.env
echo ELASTIC_PASSWORD=${ELASTIC_PASSWORD} >> packages/webapp/.env
echo ELASTIC_CERT=/app/certs/http_ca.crt >> packages/webapp/.env
echo NEXT_PUBLIC_FAIRLYTICS_URL=${FAIRLYTICS_URL} >> packages/webapp/.env
echo FAIRLYTICS_SQLITE_DB=${FAIRLYTICS_SQLITE_DB} >> packages/webapp/.env
docker build -f packages/webapp/Dockerfile -t webapp-fairlytics  .

echo "Building cli"
docker build -f packages/cli/Dockerfile -t cli-fairlytics  .


echo "Installing ElasticSearch"
make install-es

make create-index

echo "Starting..."
make start

echo "To send something to ElasticSearch (wait a minute to make sure that Logstash is up) : make test"
