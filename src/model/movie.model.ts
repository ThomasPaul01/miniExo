import { Schema, model, Document } from 'mongoose';

export interface MovieAttrs {
  title: string;
  director: string;
  year: number;
  genre?: string;
}

export interface MovieDoc extends Document {
  title: string;
  director: string;
  year: number;
  genre?: string;
}

const MovieSchema = new Schema<MovieDoc>({
  title: { 
    type: String,
    required: true,
    trim: true
},
  director: {
    type: String,
    required: true,
    trim: true 
},
  year: {
    type: Number,
    required: true,
    min: 1800
  },
  genre: {
    type: String,
    trim: true
  }
}, { timestamps: true });

export const Movie = model<MovieDoc>('Movie', MovieSchema);
