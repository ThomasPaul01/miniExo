# MiniExo API (Movies)

API Express en TypeScript avec Mongoose (POO/MVC) pour gérer des films.

## 📋 Table des matières

- [Démarrage](#démarrage)
- [Tests](#tests)
- [Architecture](#architecture)
- [Routes](#routes)
- [Guides](#guides)

## 🚀 Démarrage

### 1. Installer les dépendances

```powershell
npm install
```

### 2. Configuration

Crée un fichier `.env` à la racine:

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/?appName=<app>
PORT=3000
DB_NAME=Cinema
```

### 3. Lancer le projet

**Mode développement** (avec hot reload):

```powershell
npm run dev
```

**Build et production**:

```powershell
npm run build
npm start
```

### 4. (Optionnel) Peupler la base

```powershell
npm run seed:movies
```

## 🧪 Tests

Le projet utilise **Jest** + **Supertest** pour les tests unitaires et d'intégration.

### Lancer tous les tests

```powershell
npm test
```

### Tests disponibles

- ✅ **Tests unitaires** (`src/tests/`)
  - `sum.test.ts` — test simple d'une fonction
  - `lib.test.ts` — tests des fonctions `average()` et `getMin()`
  - `person.test.ts` — tests des classes `Person` et `Wizard`

- ✅ **Tests d'intégration** (`src/tests/`)
  - `server.test.ts` — tests de l'API Express avec Supertest

### Format du code

```powershell
npm run format       # Formatter tout le code
npm run format:check # Vérifier le formatage
```

## 🏗️ Architecture

### Structure du projet

```
src/
├── app.ts                      # Bootstrap (connexion DB + listen)
├── config/
│   └── db.ts                   # Connexion Mongoose à MongoDB
├── controllers/
│   └── movie.controller.ts     # Contrôleurs REST (validation + orchestration)
├── model/
│   ├── movie.model.ts          # Modèle Mongoose + types TS
│   └── movie.ts                # Schéma et interface Movie
├── repository/
│   ├── seedMovies.ts           # Script pour peupler la DB
│   └── testDb.ts               # Test de connexion DB
├── routes/
│   ├── index.ts                # App Express principale
│   └── movies.ts               # Routes REST pour les films
├── service/
│   └── movie.service.ts        # Logique métier (CRUD + search)
└── tests/
    ├── lib.ts                  # Fonctions utilitaires (average, getMin)
    ├── lib.test.ts             # Tests unitaires des fonctions
    ├── sum.ts & sum.test.ts    # Exemple de test simple
    ├── person.ts               # Classes Person et Wizard
    ├── person.test.ts          # Tests des classes
    ├── server.ts               # Serveur Express pour tests
    └── server.test.ts          # Tests d'intégration API
```

### Pattern MVC/POO

- **Model** : Schéma Mongoose (`movie.model.ts`)
- **Service** : Logique métier réutilisable (`movie.service.ts`)
- **Controller** : Validation + appel du service (`movie.controller.ts`)
- **Router** : Déclaration des endpoints REST (`movies.ts`)

## Routes

- POST `/movies` — créer un film
  - body: `{ "title": string, "director": string, "year": number, "genre"?: string }`
- GET `/movies/:id` — récupérer un film par id
- GET `/movies` — lister (pagination facultative)
  - query: `page?`, `limit?`
- GET `/movies/search` — recherche multi-champs + filtres
  - query: `keyword?` (regex sur `title` et `director`), `genre?`, `minYear?`, `maxYear?`, `page?`, `limit?`

## 💡 Exemples d'utilisation

### Créer un film

```powershell
curl -X POST http://localhost:3000/movies `
  -H "Content-Type: application/json" `
  -d '{\"title\":\"Inception\",\"director\":\"Christopher Nolan\",\"year\":2010,\"genre\":\"sci-fi\"}'
```

### Rechercher des films

```powershell
# Films avec "nolan" dans le titre/réalisateur, genre sci-fi, entre 2000 et 2020
curl "http://localhost:3000/movies/search?keyword=nolan&genre=sci-fi&minYear=2000&maxYear=2020"
```

### Lister tous les films

```powershell
curl "http://localhost:3000/movies?page=1&limit=10"
```

### Récupérer un film par ID

```powershell
curl "http://localhost:3000/movies/<id>"
```

## 📚 Guides

Des guides détaillés sont disponibles dans le projet :

- **[GUIDE_CREATION_PROJET.md](./GUIDE_CREATION_PROJET.md)** — Comment créer ce projet de zéro (npm, TypeScript, Express, MongoDB)
- **[PRETTIER.md](./PRETTIER.md)** — Configuration et utilisation de Prettier

## 🛠️ Technologies utilisées

- **Runtime** : Node.js
- **Langage** : TypeScript
- **Framework** : Express 5
- **Base de données** : MongoDB (Mongoose)
- **Tests** : Jest + Supertest + ts-jest
- **Formatage** : Prettier
- **Dev tools** : ts-node, dotenv

## 📝 Scripts disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Lance le serveur en mode développement (ts-node) |
| `npm run build` | Compile TypeScript vers `dist/` |
| `npm start` | Lance le serveur compilé (production) |
| `npm test` | Lance tous les tests Jest |
| `npm run format` | Formate le code avec Prettier |
| `npm run format:check` | Vérifie le formatage sans modifier |
| `npm run seed:movies` | Peuple la base avec des films de test |
| `npm run schema:cinema` | Teste la connexion MongoDB |

## 📄 License

MIT
