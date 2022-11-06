ARG ELK_VERSION
ARG ELASTIC_PASSWORD

# https://github.com/elastic/elasticsearch-docker
FROM docker.elastic.co/elasticsearch/elasticsearch:${ELK_VERSION}

ENV ES_JAVA_OPTS="-Xmx512m -Xms512m"
ENV ELASTIC_PASSWORD={$ELASTIC_PASSWORD}

# Add your elasticsearch plugins setup here
# Example: RUN elasticsearch-plugin install analysis-icu
COPY ./config/elasticsearch.yml.fairlytics /usr/share/elasticsearch/config/elasticsearch.yml
COPY ./config/mapping.json /usr/share/elasticsearch/config/mapping.json

USER root
RUN apt-get -y update && apt-get -y install curl

USER elasticsearch
