# Fairlytics : mesure d'audience sans cookie.

Pré-requis :
- Docker 
- GNU Make
- un nom de domaine
- un serveur Linux

## Installation

Configurer le fichier `.env`.

Il doit ressembler à ça :

```
ELK_VERSION=8.0.0
ELASTIC_HOST=https://localhost:9200
ELASTIC_USERNAME=elastic
ELASTIC_PASSWORD=changemeasap
SESSION_DURATION=900
FAIRLYTICS_SALT=asecretsalttoencrypipadresses
FAIRLYTICS_URL=http://localhost
```

Un template `.env.example` est fourni.

Les variables à personnaliser sont :
- ELASTIC_PASSWORD
- FAIRLYTICS_SALT
- FAIRLYTICS_URL

`FAIRLYTICS_URL` doit référencer le nom de domaine.


```
./install.sh
```

## TODO

Configuration d'un nom de domaine et d'un certificat SSL.

