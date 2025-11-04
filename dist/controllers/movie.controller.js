"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieController = void 0;
const movie_service_1 = require("../service/movie.service");
const service = new movie_service_1.MovieService();
exports.MovieController = {
    create: async (req, res) => {
        try {
            const { title, director, year, genre } = req.body || {};
            if (!title || !director || typeof year !== 'number') {
                return res.status(400).json({ error: 'title, director, year requis' });
            }
            const movie = await service.create({ title, director, year, genre });
            res.status(201).json(movie);
        }
        catch (err) {
            res.status(400).json({ error: err.message || 'Invalid data' });
        }
    },
    getById: async (req, res) => {
        try {
            const movie = await service.findById(req.params.id);
            if (!movie)
                return res.status(404).json({ error: 'Not found' });
            res.json(movie);
        }
        catch (err) {
            res.status(400).json({ error: 'Invalid id' });
        }
    },
    list: async (req, res) => {
        const page = Number(req.query.page ?? 1);
        const limit = Number(req.query.limit ?? 10);
        const result = await service.list(page, limit);
        res.json(result);
    },
};
