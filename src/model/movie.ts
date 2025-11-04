import type { ObjectId } from 'mongodb';
export interface Movie {
  _id?: ObjectId;
  title: string;
  year: number;
  genres?: string[];
  released?: Date;
  rating?: number;
}
