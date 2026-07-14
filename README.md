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
C'est fait automatiquement par le script d'installation, qui écrit aussi le réglage dans
`/etc/sysctl.d/99-fairlytics.conf` afin qu'il soit ré-appliqué à chaque démarrage du serveur.

Sans ce fichier, la valeur revient à sa valeur par défaut au premier redémarrage. Elasticsearch
échoue alors sur son contrôle de démarrage :

```
bootstrap check failure : max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]
```

Il redémarre en boucle, et plus aucune donnée n'est collectée ni affichée.

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

## Maintenance : les certificats d'Elasticsearch expirent

Elasticsearch génère lui-même son certificat HTTP au premier démarrage. Ce certificat n'est
valable que **2 ans**, et rien ne prévient de son expiration.

Une fois expiré, Logstash ne peut plus écrire dans Elasticsearch :

```
Elasticsearch Unreachable: [https://elasticsearch:9200/]
PKIX path validation failed: CertPathValidatorException: validity check failed
```

Sa file d'attente sature, et il se met à répondre `429 Too Many Requests` sur `/hit`. Comme une
réponse 429 ne porte aucun en-tête CORS, les navigateurs des sites monitorés signalent une
**erreur CORS trompeuse** : le vrai problème est le certificat, pas le CORS. Pendant ce temps,
les visites ne sont plus enregistrées.

Attention : la panne peut rester invisible longtemps après la date d'expiration. Tant que
Logstash garde ses connexions TLS ouvertes, aucune nouvelle négociation n'a lieu. Le problème
se déclenche en général au redémarrage suivant du serveur.

Pour afficher les dates d'expiration :

```
make check-es-certs
```

Pour renouveler le certificat et son autorité de certification (les index ne sont pas touchés) :

```
make renew-es-certs
```

Cette commande régénère les certificats, met à jour l'autorité de certification utilisée par
Logstash, la webapp, Kibana et le cli, puis redémarre Elasticsearch et Logstash.

> Remarque : les certificats et la configuration générés par Elasticsearch vivent à l'intérieur
> du conteneur. Un `docker restart` les conserve, mais une recréation du conteneur
> (`docker compose up --force-recreate elasticsearch`) les perdrait.

## Anonymisation des données

Chaque page dotée du tag fairlytics envoie des données qui sont anonymisées avant leur stockage dans la base de données ElasticSearch.

Voici un exemple d'enregistrement stocké :

```
{
               "utm" => "",
    "unique_visitor" => "8f7b34e8947c5cbf72136aa6db15bafacbc9018bbf4aa05f95079964353c2d39",
          "hostname" => "le-site-visite.fr",
     "fairlyticskey" => "uaxnijazc983NSIUH8aezfazef763BIU98635oizec",
              "href" => "https://le-site-visite.fr/",
          "os_patch" => "7",
                "os" => "Mac OS X",
              "page" => "/",
            "device" => "Mac",
          "@version" => "1",
             "geoip" => {
                    "location" => {
                    "lon" => -1.2734,
                    "lat" => 48.1236
                },
                "timezone" => "Europe/Paris",
                "region_name" => "Manche",
                "country_name" => "France"
            },
            "name" => "Safari",
            "referrer" => "",
            "session" => "ea00fce002360560960d274a8c64818a0f09dddf4d10ceb7c9dd9a2970abb4b6",
            "@timestamp" => 2023-01-12T14:59:14.512923Z
}
```

L'identifiant de visiteur unique est le chiffrement de :
- l'adresse IP
- le nom du site visité ("hostname")
- une clé de chiffrement fixée aléatoirement lors de l'installation de Fairlytics
- la date du jour

Puis on jette l'adresse IP.

L'id de session est élaboré en observant l'écart temporel entre 2 hits d'un même identifiant de visiteur unique.
Lorsque cet écart est supérieur à la durée max configurée, on génère un nouvel id de session aléatoire.

Ainsi on ne peut pas savoir :
-  si un visiteur a consulté 2 sites différents monitorés par Fairlytics
-  si un visiteur est revenu sur le même site un autre jour

