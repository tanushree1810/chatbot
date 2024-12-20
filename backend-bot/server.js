import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import queryRoutes from './routes/queries.js';
import intelligenceRoutes from './routes/intelligence.js';
import aiRoutes from './routes/ai.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON requests

// Debug: Confirm server setup
console.log('[Server] Middleware initialized');

// Routes
app.use('/api/queries', queryRoutes); // User query routes
app.use('/api/intelligence', intelligenceRoutes); // Threat intelligence routes
app.use('/api/ai', aiRoutes); // AI/ML communication routes

// Debug: Confirm routes setup
console.log('[Server] Routes registered');

// Handle favicon requests
app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // No Content
});

// Root route to confirm API is running
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API is running successfully',
    status: 'OK',
    routes: [
      { path: '/api/queries', description: 'User query routes' },
      { path: '/api/intelligence', description: 'Threat intelligence routes' },
      { path: '/api/ai', description: 'AI/ML communication routes' },
    ],
  });
});

// Error handling middleware
app.use(errorHandler);

// Debug: Catch unexpected requests
app.use('*', (req, res) => {
  console.warn(`[Server] Unmatched request: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: 'Route not found' });
});

// Server Port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`[Server] Server running on port ${PORT}`);
});
