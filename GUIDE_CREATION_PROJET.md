# Guide complet: Créer ce projet (Express + TypeScript + MongoDB) de zéro

Ce guide pas-à-pas explique comment recréer un projet identique à ce dépôt sous Windows avec PowerShell: initialisation npm, installation des dépendances, configuration TypeScript, structure des dossiers, scripts, et variables d'environnement.

> Versions ciblées d'après ce projet:
>
> - Node.js LTS (18+ recommandé)
> - express ^5
> - mongoose ^8, mongodb ^6
> - typescript ^5, ts-node ^10

---

## 1) Initialiser le projet npm

```powershell
# Créer un dossier et s'y placer
mkdir miniExo; cd miniExo

# Initialiser npm
npm init -y
```

## 2) Installer les dépendances

```powershell
# Dépendances runtime
npm i express mongoose mongodb dotenv

# Dépendances de développement (TypeScript + types)
npm i -D typescript ts-node @types/node @types/express
```

## 3) Configurer TypeScript

```powershell
# Crée un tsconfig.json par défaut
npx tsc --init
```

Ensuite, adapter `tsconfig.json` comme dans ce projet:

```jsonc
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"],
}
```

## 4) Structure des dossiers

```text
src/
  app.ts
  config/
    db.ts
  controllers/
  model/
  repository/
  routes/
  service/
```

Créez les dossiers:

```powershell
mkdir src
mkdir src/config, src/controllers, src/model, src/repository, src/routes, src/service
```

## 5) Code minimal

- `src/config/db.ts` (connexion MongoDB via Mongoose):

```ts
import mongoose from 'mongoose';
import 'dotenv/config';

export async function connectDB(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI manquant dans .env');
  }
  const dbName = process.env.DB_NAME || 'Cinema';
  return mongoose.connect(uri, { dbName });
}
```

- `src/routes/index.ts` (application Express):

```ts
import express, { Request, Response } from 'express';
import moviesRouter from './movies';

const app = express();

app.use(express.json());
app.use((req, res, next) => logger(req, res, next));

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.use('/movies', moviesRouter);

function logger(req: Request, _res: Response, next: express.NextFunction) {
  if (process.env.LOG_REQUEST_HEADERS === '1') {
    console.log('\n--- headerLogger: request.headers ---');
    console.log(req.headers);
    console.log('--- end headers ---\n');
  }
  next();
}
export default app;
```

- `src/app.ts` (bootstrap serveur):

```ts
import dotenv from 'dotenv';
import app from './routes/index';
import { connectDB } from './config/db';

dotenv.config();

(async () => {
  try {
    await connectDB();
    const port = Number(process.env.PORT || 3000);
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('DB connection failed:', err);
    process.exit(1);
  }
})();
```

- `src/routes/movies.ts` (exemple de router minimal):

```ts
import { Router } from 'express';
const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'Movies API' });
});

export default router;
```

## 6) Fichier .env

Créez un fichier `.env` à la racine du projet:

```dotenv
PORT=3000
MONGODB_URI=mongodb://localhost:27017
DB_NAME=Cinema
# LOG_REQUEST_HEADERS=1
```

Ne pas commiter vos secrets: ajoutez `.env` à `.gitignore` si nécessaire.

## 7) Scripts npm

Ajoutez ces scripts dans `package.json`:

```jsonc
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/app.js",
    "dev": "ts-node ./src/app.ts",
    "schema:cinema": "ts-node ./src/repository/testDb.ts",
    "seed:movies": "ts-node ./src/repository/seedMovies.ts",
  },
}
```

- `dev`: lance le serveur directement en TypeScript via ts-node (hot reload possible avec nodemon si vous le souhaitez).
- `build`: compile TypeScript vers `dist`.
- `start`: exécute la version compilée.
- `schema:cinema` et `seed:movies`: utilitaires (facultatifs) pour créer/peupler la base suivant vos fichiers.

Optionnel hot-reload avec Nodemon:

```powershell
npm i -D nodemon
```

Fichier `nodemon.json` (optionnel):

```json
{
  "watch": ["src"],
  "ext": "ts,js,json",
  "exec": "ts-node ./src/app.ts"
}
```

Script alternatif:

```jsonc
{
  "scripts": {
    "dev": "nodemon",
  },
}
```

## 8) Lancer le projet

```powershell
# Mode dev (ts-node)
npm run dev

# Build + start (JS compilé)
npm run build; npm start
```

Le serveur écoute par défaut sur http://localhost:3000

## 9) Seeder / scripts utilitaires (optionnel)

Si vous avez des scripts comme dans ce dépôt:

```powershell
# Créer le schéma de base (exemple)
npm run schema:cinema

# Peupler des films (exemple)
npm run seed:movies
```

## 10) Débogage rapide

- Si la connexion MongoDB échoue: vérifiez `MONGODB_URI` et que MongoDB tourne en local (ou avec Docker). Exemple Docker rapide:

```powershell
# Démarrer MongoDB local avec Docker (optionnel)
docker run --name mongo -p 27017:27017 -d mongo:7
```

- Si `npm start` plante, assurez-vous d'avoir fait `npm run build` et que `dist/app.js` existe.
- En dev, utilisez `npm run dev` qui n'a pas besoin du build.

## 11) (Optionnel) Qualité de code

```powershell
# ESLint + Prettier (optionnel)
npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier eslint-plugin-prettier
```

Fichiers de base à ajouter: `.eslintrc.cjs`, `.prettierrc` selon vos préférences.

---

## Récapitulatif des commandes npm

```powershell
# Init
npm init -y

# Dépendances
npm i express mongoose mongodb dotenv

# Dev deps
npm i -D typescript ts-node @types/node @types/express

# TypeScript
npx tsc --init

# (Optionnel) Hot reload
npm i -D nodemon

# Lancer
npm run dev
npm run build; npm start

# Scripts utilitaires (si présents)
npm run schema:cinema
npm run seed:movies
```

> Remarque: ce guide est aligné avec la configuration actuelle de ce dépôt (`package.json`, `tsconfig.json`, et `src/`). Adaptez les exemples de code aux besoins de votre application.
