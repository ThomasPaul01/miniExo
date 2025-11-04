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
