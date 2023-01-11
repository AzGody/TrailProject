# Reactive Trail
Le Front tourne avec <code>pnpm</code> et ViteJS afin d'optimiser les performances ainsi que la rapidité de développement.
Les spécifités sont détaillés ci-dessous.

## Usage

```bash
git clone https://github.com/AzGody/TrailProject.git
cd ReactTrail
pnpm install
```
Pour installer <code>pnpm</code> :
```bash
npm install -g pnpm
```

## Launch dev server

```bash
pnpm run dev
```

# Reactive Trail API

## Installation

### Création de la base de données

Il faut un serveur de base de données MYSQL

```sql
CREATE DATABASE IF NOT EXISTS `reactiv-trail`;
```

### Ajout du mot de passe de votre base MySQL

- Dans le fichier `.env`

```dotenv
DATABASE_URL="mysql://root:VOTRE_MOT_DE_PASSE_MYSQL@127.0.0.1:3306/reactiv-trail"
```

### Se placer dans le dossier ReactTrailAPI et installer les dépendances

```bash
composer install
```

### Lancer les migrations

```bash
php bin/console doctrine:migrations:migrate
```

### Lancer le serveur Symfony

```bash
symfony server:start
```



# Informations supplémentaires

## Problème de génération des clé pour le JWT

```Windows CMD
scoop install openssl
```

Puis redémarrer l'ordinateur, et refaire le 

```Projet API 
php bin/console lexik:jwt:generate-keypair
```
