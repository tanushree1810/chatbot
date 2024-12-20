import express from 'express';
import { getAIResponse } from '../controllers/aiController.js';

const router = express.Router();

// POST: /api/ai/process - AI/ML model interaction
router.post('/process', async (req, res) => {
  const { prompt } = req.body;

  try {
    const aiResponse = await getAIResponse(prompt);
    res.status(200).json({ response: aiResponse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Debug: Log when AI routes are registered
console.log('[Routes] AI routes initialized');

export default router;
