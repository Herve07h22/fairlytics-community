# Fairlytics : mesure d'audience sans cookie.

Pré-requis :
- Docker (> 20.10) avec le plugin compose. Voir l'installation pour [Debian](https://docs.docker.com/engine/install/debian/)
- GNU Make
- un nom de domaine
- un serveur Linux

## Installation

```
git clone git@github.com:Herve07h22/fairlytics-community.git fairlytics
cd fairlytics
```

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
FAIRLYTICS_SQLITE_DB=/app/db/fairlytics.db
```

Un template `.env.example` est fourni.
```
cp .env.example .env
nano .env
```


Les variables à personnaliser sont :
- ELASTIC_PASSWORD
- FAIRLYTICS_SALT
- FAIRLYTICS_URL

`FAIRLYTICS_URL` doit référencer le nom de domaine.

Pour Debian il faut positionner [max_map_count](https://stackoverflow.com/questions/51445846/elasticsearch-max-virtual-memory-areas-vm-max-map-count-65530-is-too-low-inc) :

```
sysctl -w vm.max_map_count=262144
docker system prune -a
```

Editer le fichier `/etc/sysctl.conf` et mettre vm.max_map_count à 262144.

```
./install.sh
```

## TODO

Configuration d'un nom de domaine et d'un certificat SSL.

