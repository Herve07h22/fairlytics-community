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
FAIRLYTICS_URL=https://votresupernomde.domaine
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

`FAIRLYTICS_URL` doit référencer le nom de domaine. Il doit être de la forme `https://votresupernomde.domaine`.
Le DNS doit être configuré pour que votre serveur soit accessible par ce nom de domaine.
Pour vérifier cela :
 ```
 ping votresupernomde.domaine
 ```
 doit indiquer l'adresse IP de votre serveur.

Pour Debian il faut positionner [max_map_count](https://stackoverflow.com/questions/51445846/elasticsearch-max-virtual-memory-areas-vm-max-map-count-65530-is-too-low-inc).
C'est fait automatiquement dans le script d'installation, mais ré-initialisé à chaque redémarrage.
Pour rendre cela pérenne, éditer le fichier `/etc/sysctl.conf` et mettre vm.max_map_count à 262144.

```
./install.sh
```

## Configuration du certificat SSL

Il faut que votre serveur soit sécurisé par une connexion HTTPS pour crypter les données envoyées par le script JS.
Donc il vous faut un nom de domaine, et un certificat SSL.

Le nom de domaine doit avoir été renseignée dans le fichier `.env` :
```
FAIRLYTICS_URL=https://votresupernomde.domaine
```

L'obtention des certificats s'effectue par :
```
make install-ssl
```

Cette commande invoque le certbot de Lets Encrypt. Il va vous demander :
- une adresse mail de contact (pour vous prévenir d'un problème, comme l'expiration du certificat)
- le nom du domaine. Attention, ne pas mettre `https://`, mais seulement le nom sous la forme `votresupernomde.domaine`


