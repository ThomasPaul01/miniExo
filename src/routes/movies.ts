import express, { Request, Response } from 'express';
import { MovieController } from '../controllers/movie.controller';

const router = express.Router();

// CRUD minimal
router.post('/', MovieController.create);
router.get('/:id', MovieController.getById);
router.get('/', MovieController.list);

export default router;
