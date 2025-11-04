"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieService = void 0;
const movie_model_1 = require("../model/movie.model");
class MovieService {
    async create(attrs) {
        const movie = new movie_model_1.Movie(attrs);
        return movie.save();
    }
    async findById(id) {
        return movie_model_1.Movie.findById(id).exec();
    }
    async list(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            movie_model_1.Movie.find().skip(skip).limit(limit).sort({ createdAt: -1 }).exec(),
            movie_model_1.Movie.countDocuments().exec(),
        ]);
        return { items, total, page, limit };
    }
}
exports.MovieService = MovieService;
