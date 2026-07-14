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

if [ "$OS" = "Debian" ] || [ "$OS" = "Ubuntu" ]
then
    echo "Setting vm.max_map_count for Linux $OS"
    # Apply it now...
    sudo sysctl -w vm.max_map_count=262144
    # ...and persist it. Without this file the value is reset to its default on
    # the next reboot, Elasticsearch then fails its bootstrap check ("max virtual
    # memory areas vm.max_map_count [65530] is too low") and restarts endlessly.
    echo "# Required by Elasticsearch (fairlytics)" | sudo tee /etc/sysctl.d/99-fairlytics.conf > /dev/null
    echo "vm.max_map_count=262144" | sudo tee -a /etc/sysctl.d/99-fairlytics.conf > /dev/null
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
cp -n ./nginx/nginx.conf.http ./nginx/nginx.conf 
touch packages/webapp/.env
echo ELASTIC_USERNAME=${ELASTIC_USERNAME} > packages/webapp/.env
echo ELASTIC_PASSWORD=${ELASTIC_PASSWORD} >> packages/webapp/.env
echo ELASTIC_CERT=/app/certs/http_ca.crt >> packages/webapp/.env
echo FAIRLYTICS_URL=${FAIRLYTICS_URL} >> packages/webapp/.env
echo FAIRLYTICS_LANDINGPAGE_URL=${FAIRLYTICS_LANDINGPAGE_URL} >> packages/webapp/.env
echo FAIRLYTICS_SQLITE_DB=${FAIRLYTICS_SQLITE_DB} >> packages/webapp/.env
echo MAILGUN_API_KEY=${MAILGUN_API_KEY} >> packages/webapp/.env
echo MAILGUN_DOMAIN=${MAILGUN_DOMAIN} >> packages/webapp/.env
echo MAILGUN_SENDER=${MAILGUN_SENDER} >> packages/webapp/.env
echo MAILGUN_URL=${MAILGUN_URL} >> packages/webapp/.env
echo MAILGUN_TEMPLATE=${MAILGUN_TEMPLATE} >> packages/webapp/.env

docker compose build webapp

echo "Building cli"
docker compose build cli


echo "Installing ElasticSearch"
make install-es

make create-index

echo "Starting..."
make start

echo "To send something to ElasticSearch (wait a minute to make sure that Logstash is up) : make test"
