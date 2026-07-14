#!/bin/bash
#
# Renews the Elasticsearch HTTP certificate and its CA.
#
# Why this script exists
# ----------------------
# Elasticsearch 8 auto-generates its HTTP certificate on first start, with a
# validity of 2 years for the certificate and 3 years for the CA. Nothing warns
# you when they expire.
#
# Once the certificate has expired, Logstash refuses the TLS handshake:
#
#     Elasticsearch Unreachable: [https://elasticsearch:9200/]
#     PKIX path validation failed: CertPathValidatorException: validity check failed
#
# Logstash then stops indexing, its in-memory queue fills up, and it starts
# answering "429 Too Many Requests" on /hit. A 429 carries no CORS header, so
# the browsers of the monitored sites report a misleading CORS error and every
# hit is lost.
#
# Note that the failure can stay hidden for months: as long as Logstash keeps
# its pooled TLS connections open, no new handshake happens. It typically
# surfaces after a server reboot, long after the actual expiry date.
#
# What it does
# ------------
# Generates a new CA and a new HTTP certificate (10 years by default), installs
# them, and restarts Elasticsearch and Logstash. The indices are never touched:
# only the content of config/certs is rewritten.
#
# Usage : make renew-es-certs      (or DAYS=825 ./elasticsearch/renew-certs.sh)

set -euo pipefail

# ELASTIC_PASSWORD is read from .env, as in install.sh.
if [ -f .env ]; then
    # shellcheck disable=SC1091
    source .env
fi

if [ -z "${ELASTIC_PASSWORD:-}" ]; then
    echo "Error: \$ELASTIC_PASSWORD is not set in the .env file"
    exit 1
fi

ES_CONTAINER=elasticsearch-fairlytics
LOGSTASH_CONTAINER=logstash-fairlytics
ES_CONFIG=/usr/share/elasticsearch/config
DAYS=${DAYS:-3650}

if ! docker ps --format '{{.Names}}' | grep -q "^${ES_CONTAINER}$"; then
    echo "Error: ${ES_CONTAINER} is not running. Start it first (make start)."
    exit 1
fi

echo "Current HTTP certificate:"
docker exec "${ES_CONTAINER}" openssl x509 -in "${ES_CONFIG}/certs/http_ca.crt" -noout -dates || true

echo
echo "Backing up the current certificates..."
docker exec "${ES_CONTAINER}" tar czf /tmp/certs-backup.tgz -C "${ES_CONFIG}" certs
docker cp "${ES_CONTAINER}:/tmp/certs-backup.tgz" "./elasticsearch/certs-backup-$(date +%Y%m%d%H%M%S).tgz"

echo "Generating a new CA and a new HTTP certificate (valid ${DAYS} days)..."
# The .p12 keystore is protected by a password stored in the Elasticsearch
# keystore. We reuse it, so that elasticsearch.yml needs no change.
docker exec "${ES_CONTAINER}" bash -c "
    set -e
    cd /usr/share/elasticsearch
    PW=\$(bin/elasticsearch-keystore show xpack.security.http.ssl.keystore.secure_password)

    bin/elasticsearch-certutil ca --silent --out /tmp/ca.p12 --pass '' --days ${DAYS}

    bin/elasticsearch-certutil cert --silent \
        --ca /tmp/ca.p12 --ca-pass '' \
        --name elasticsearch \
        --dns elasticsearch,localhost,${ES_CONTAINER} \
        --ip 127.0.0.1 \
        --days ${DAYS} \
        --out /tmp/http.p12 --pass \"\$PW\"

    # PEM version of the CA, needed by Logstash, the webapp, Kibana and the cli.
    openssl pkcs12 -in /tmp/ca.p12 -passin pass: -nokeys -out /tmp/http_ca.crt

    cp /tmp/http.p12 ${ES_CONFIG}/certs/http.p12
    cp /tmp/http_ca.crt ${ES_CONFIG}/certs/http_ca.crt
    rm -f /tmp/ca.p12 /tmp/http.p12 /tmp/http_ca.crt
"

# The other containers mount ./elasticsearch/certs, so the CA must be updated
# on the host too, otherwise they keep validating against the expired one.
echo "Publishing the new CA to ./elasticsearch/certs/ ..."
docker cp "${ES_CONTAINER}:${ES_CONFIG}/certs/http_ca.crt" ./elasticsearch/certs/http_ca.crt

echo "Restarting Elasticsearch..."
docker restart "${ES_CONTAINER}" > /dev/null

echo "Waiting for Elasticsearch to answer over TLS..."
until docker exec "${ES_CONTAINER}" curl -s --cacert "${ES_CONFIG}/certs/http_ca.crt" \
        -u "elastic:${ELASTIC_PASSWORD}" https://elasticsearch:9200 | grep -q tagline; do
    sleep 2
done

echo "Restarting Logstash so that it reloads the CA..."
docker restart "${LOGSTASH_CONTAINER}" > /dev/null

echo
echo "New HTTP certificate:"
docker exec "${ES_CONTAINER}" openssl x509 -in "${ES_CONFIG}/certs/http_ca.crt" -noout -dates

echo
echo "Done. Check that Logstash reconnects (it should log 'Restored connection to ES instance'):"
echo "  docker logs --tail 20 ${LOGSTASH_CONTAINER}"
