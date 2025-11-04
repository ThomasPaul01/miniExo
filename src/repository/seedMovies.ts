import 'dotenv/config';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI ?? '';
if (!uri) {
  throw new Error('MONGODB_URI manquant. Définis-le dans .env');
}

// Type élargi pour accepter des champs additionnels dans certains échantillons
type MovieSeed = {
  title: string;
  director: string;
  year: number;
  genre?: string;
  mainActors?: string[];
  genres?: string[];
};

const docs: MovieSeed[] = [
  { title: 'Inception', director: 'Christopher Nolan', year: 2010 },
  { title: 'Interstellar', director: 'Christopher Nolan', year: 2014 },
  { title: 'Pulp Fiction', director: 'Quentin Tarantino', year: 1994 },
  { title: 'Parasite', director: 'Bong Joon-ho', year: 2019 },
  {
    title: 'The Matrix',
    director: 'The Wachowskis',
    year: 1999,
    mainActors: ['Keanu Reeves', 'Laurence Fishburne'],
    genres: ['Sci-Fi', 'Action'],
  },
];

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('Cinema');
    const coll = db.collection<MovieSeed>('movies');

    const existing = await coll.estimatedDocumentCount();
    if (existing > 0) {
      console.log(`La collection 'movies' contient déjà ${existing} documents. Aucun insert.`);
      return;
    }

    const res = await coll.insertMany(docs);
    console.log(`Insérés: ${res.insertedCount} documents dans Cinema.movies.`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
