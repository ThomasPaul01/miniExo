"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movie_controller_1 = require("../controllers/movie.controller");
const router = express_1.default.Router();
// CRUD minimal
router.post('/', movie_controller_1.MovieController.create);
router.get('/:id', movie_controller_1.MovieController.getById);
router.get('/', movie_controller_1.MovieController.list);
exports.default = router;
