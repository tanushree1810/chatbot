import express from 'express';
import { handleUserQuery } from '../controllers/queriesController.js';

const router = express.Router();

// Route for user queries
router.post('/', handleUserQuery);

// Debug: Log route registration
console.log('[Routes] Queries routes initialized');

export default router;
