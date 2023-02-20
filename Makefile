include .env

install-es:
	@docker compose down
	@docker volume rm -f `docker volume ls -q -fname=fairlytics*` skip-if-not-exist
	@docker compose build --no-cache
	@mkdir -p ./elasticsearch/certs
	@docker compose up -d elasticsearch
	@echo "Waiting for Elasticsearch to start..."
	@while [ -z `docker exec -it elasticsearch-fairlytics /bin/bash -c "find /usr/share/elasticsearch -name http_ca.crt" | grep http_ca.crt ` ]; do sleep 2; done
	@docker exec -it elasticsearch-fairlytics /bin/bash -c "find /usr/share/elasticsearch -name http_ca.crt"
	@docker cp elasticsearch-fairlytics:/usr/share/elasticsearch/config/certs/http_ca.crt ./elasticsearch/certs/
	# TODO : persist the created elasticsearch.yml to prevent ES crash when container is re-created
	@docker cp elasticsearch-fairlytics:/usr/share/elasticsearch/config/elasticsearch.yml  ./elasticsearch/config/
	@while [ -z `docker exec -it elasticsearch-fairlytics /bin/bash -c "curl --cacert /usr/share/elasticsearch/config/certs/http_ca.crt -u elastic:${ELASTIC_PASSWORD} https://elasticsearch:9200" | grep tagline ` ]; do sleep 2; done
	@echo "Generating a new enrollment token. Use it with command 'make install-kibana' :"
	@echo "------------------------------------------------------"
	@docker exec -it elasticsearch-fairlytics /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana
	@echo "------------------------------------------------------"

install-kibana:
	@docker compose up -d kibana
	@echo "Waiting for Kibana to start..."
	@while [ -z `docker logs kibana-fairlytics | grep http://kibana:5601` ]; do sleep 2; done
	@docker exec -it -u root kibana-fairlytics /usr/share/kibana/bin/kibana-setup
	@docker compose restart kibana

create-index:
	@echo "Creating fairlytics index ..."
	@docker exec -it elasticsearch-fairlytics /bin/bash -c "curl --cacert /usr/share/elasticsearch/config/certs/http_ca.crt -XPUT -H Content-Type:application/json -d @/usr/share/elasticsearch/config/mapping.json -u elastic:${ELASTIC_PASSWORD} https://elasticsearch:9200/fairlytics_1"
	@echo "Creating fairlytics alias ..."
	@docker exec -it elasticsearch-fairlytics /bin/bash -c "curl --cacert /usr/share/elasticsearch/config/certs/http_ca.crt -XPOST -H Content-Type:application/json -d @/usr/share/elasticsearch/config/alias.json -u elastic:${ELASTIC_PASSWORD} https://elasticsearch:9200/_aliases"

test:
	@echo "Sending tests data similar to what should be sent by tag.js"
	@echo "Theses data should by visible with Kibana"
	curl -XPOST http://localhost/hit -H "Content-Type: application/json" -d @logstash/test/playload.json
	curl -XPOST http://localhost/hit -H "Content-Type: application/json" -d @logstash/test/playload_utm.json
	curl -XPOST http://localhost/hit -H "Content-Type: application/json" -d @logstash/test/playload_utm2.json
	curl -XPOST http://localhost/hit -H "Content-Type: application/json" -d @logstash/test/playload_gclid.json
	curl -XPOST http://localhost/api/register -H "Content-Type: application/json" -d '{"email":"${MAILGUN_SENDER}"}'

stop:
	@docker compose down

start:
	@echo "Starting fairlytics (without kibana)"
	@docker compose up -d --no-recreate logstash elasticsearch
	@docker compose up -d nginx webapp

cli:
	@docker compose run cli sh

kibana:
	@docker compose up -d kibana

backup:
	yarn backup

install-ssl:
	@echo "----------------------------------------------------------------"
	@echo "Installing the first SSL certificates to $(FAIRLYTICS_URL)"
	@echo "----------------------------------------------------------------"
	@echo "Starting all the services : nginx and certbot have to be running"
	@docker-compose up -d --no-recreate logstash elasticsearch nginx webapp certbot
	@echo "We'll using nginx to serve $(FAIRLYTICS_URL)/.well-known/acme-challenge/"
	@echo "(that's the place certbot will write the challenge)"
	@docker exec -it certbot-fairlytics certbot certonly --webroot -w /var/www/certbot --cert-name fairlytics
	@echo "Allowing nginx to read the certificate"
	@docker exec -it nginx-fairlytics sh -c "chown -R nginx:nginx /etc/letsencrypt/*"
	@echo "Updating nginx.conf"
	@cp ./nginx/nginx.conf.https ./nginx/nginx.conf
	@docker-compose restart nginx
	@echo "----------------------------------------------------------------"

activate-ssl:
	@echo "Allowing nginx to read the certificate"
	@docker exec -it nginx-fairlytics sh -c "chown -R nginx:nginx /etc/letsencrypt/*"
	@echo "Updating nginx.conf"
	@cp ./nginx/nginx.conf.https ./nginx/nginx.conf
	@docker-compose restart nginx
