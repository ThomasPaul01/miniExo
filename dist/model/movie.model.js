"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const mongoose_1 = require("mongoose");
const MovieSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    director: { type: String, required: true, trim: true },
    year: { type: Number, required: true, min: 1800 },
    genre: { type: String, trim: true },
}, { timestamps: true });
exports.Movie = (0, mongoose_1.model)('Movie', MovieSchema);
