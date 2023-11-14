import UsersController from '../controllers/users.js';
import express from 'express';

const router = express.Router();

router.get('/:id', UsersController.getUserById);

export default router;