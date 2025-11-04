# MiniExo API (Movies)

API Express en TypeScript avec Mongoose (POO/MVC) pour gérer des films.

## Démarrage

1. Crée un fichier `.env` à la racine:

```
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/?appName=<app>
PORT=3000
```

2. Installer les dépendances:

```
npm install
```

3. Lancer en dev (ts-node):

```
npm run dev
```

Ou build + run:

```
npm run build
npm start
```

4. Optionnel: insérer quelques films de démo:

```
npm run seed:movies
```

## Architecture

- `src/config/db.ts` — connexion Mongoose à MongoDB
- `src/model/movie.model.ts` — modèle Mongoose + types TS
- `src/service/movie.service.ts` — classe métier (create, findById, list, search)
- `src/controllers/movie.controller.ts` — contrôleurs fins (validation légère + orchestration)
- `src/router/movies.ts` — déclaration des routes REST
- `src/router/index.ts` — app Express et montage des routes
- `src/app.ts` — bootstrap (connexion DB + listen)

## Routes

- POST `/movies` — créer un film
  - body: `{ "title": string, "director": string, "year": number, "genre"?: string }`
- GET `/movies/:id` — récupérer un film par id
- GET `/movies` — lister (pagination facultative)
  - query: `page?`, `limit?`
- GET `/movies/search` — recherche multi-champs + filtres
  - query: `keyword?` (regex sur `title` et `director`), `genre?`, `minYear?`, `maxYear?`, `page?`, `limit?`

## Exemples

- Créer:
```
curl -X POST http://localhost:3000/movies \
  -H "Content-Type: application/json" \
  -d '{"title":"Inception","director":"Christopher Nolan","year":2010,"genre":"sci-fi"}'
```

- Recherche:
```
# films dont le titre ou le réalisateur matche "nolan", genre sci-fi, entre 2000 et 2020
curl "http://localhost:3000/movies/search?keyword=nolan&genre=sci-fi&minYear=2000&maxYear=2020"
```
