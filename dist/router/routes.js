"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../router/index"));
index_1.default.get("/api/cinema", async (req, res) => {
    try {
        const movies = await movieRepository.getAllMovies();
        res.json(movies);
    }
    catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});
index_1.default.post("/api/cinema", async (req, res) => {
    const newMovie = req.body;
    try {
        const result = await movieRepository.addMovie(newMovie);
        res.status(201).json(result);
    }
    catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});
