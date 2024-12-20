import express from 'express';
import {
  fetchVirusTotalFileData,
  fetchVirusTotalURLData,
  fetchVirusTotalIPData,
  fetchShodanData,
  fetchCVEData,
} from '../controllers/intelligenceController.js';

const router = express.Router();

// Routes for intelligence
router.post('/virustotal/file', fetchVirusTotalFileData);
router.post('/virustotal/url', fetchVirusTotalURLData);
router.post('/virustotal/ip', fetchVirusTotalIPData);
router.post('/shodan', fetchShodanData);
router.post('/cve', fetchCVEData);

console.log('[Routes] Intelligence routes initialized');

export default router;
