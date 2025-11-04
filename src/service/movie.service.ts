import { Movie, MovieDoc, MovieAttrs } from '../model/movie.model';

export class MovieService {
  async create(attrs: MovieAttrs): Promise<MovieDoc> {
    const movie = new Movie(attrs);
    return movie.save();
  }

  async findById(id: string): Promise<MovieDoc | null> {
    return Movie.findById(id).exec();
  }

  async list(page = 1, limit = 10): Promise<{ items: MovieDoc[]; total: number; page: number; limit: number }>{
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Movie.find().skip(skip).limit(limit).sort({ createdAt: -1 }).exec(),
      Movie.countDocuments().exec(),
    ]);
    return { items, total, page, limit };
  }
}
