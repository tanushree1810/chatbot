import {
  getVirusTotalFileReport,
  getVirusTotalURLReport,
  getVirusTotalIPReport,
} from '../services/virusTotalService.js';
import { getShodanData } from '../services/shodanService.js';
import { getCVEData } from '../services/cveService.js';

// Fetch VirusTotal Data for Files (Hash-based Analysis)
export const fetchVirusTotalFileData = async (req, res) => {
  try {
    const { hash } = req.body;

    if (!hash) {
      console.warn('[VirusTotal] Missing hash in request');
      return res.status(400).json({ error: 'Hash is required' });
    }

    const report = await getVirusTotalFileReport(hash);
    res.status(200).json(report);
  } catch (error) {
    console.error(`[VirusTotal File Error] ${error.message}`);
    res.status(500).json({ error: 'Error fetching VirusTotal file data' });
  }
};

// Fetch VirusTotal Data for URLs
export const fetchVirusTotalURLData = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      console.warn('[VirusTotal] Missing URL in request');
      return res.status(400).json({ error: 'URL is required' });
    }

    const report = await getVirusTotalURLReport(url);
    res.status(200).json(report);
  } catch (error) {
    console.error(`[VirusTotal URL Error] ${error.message}`);
    res.status(500).json({ error: 'Error fetching VirusTotal URL data' });
  }
};

// Fetch VirusTotal Data for IP Addresses
export const fetchVirusTotalIPData = async (req, res) => {
  try {
    const { ip } = req.body;

    if (!ip) {
      console.warn('[VirusTotal] Missing IP in request');
      return res.status(400).json({ error: 'IP is required' });
    }

    const report = await getVirusTotalIPReport(ip);
    res.status(200).json(report);
  } catch (error) {
    console.error(`[VirusTotal IP Error] ${error.message}`);
    res.status(500).json({ error: 'Error fetching VirusTotal IP data' });
  }
};

// Fetch Shodan Data
export const fetchShodanData = async (req, res) => {
  try {
    const { ip } = req.body;

    if (!ip) {
      console.warn('[Shodan] Missing IP in request');
      return res.status(400).json({ error: 'IP is required' });
    }

    const data = await getShodanData(ip);
    res.status(200).json(data);
  } catch (error) {
    console.error(`[Shodan Error] ${error.message}`);
    res.status(500).json({ error: 'Error fetching Shodan data' });
  }
};

// Fetch CVE Data
export const fetchCVEData = async (req, res) => {
  try {
    const { cveId } = req.body;

    if (!cveId) {
      console.warn('[CVE] Missing CVE ID in request');
      return res.status(400).json({ error: 'CVE ID is required' });
    }

    const data = await getCVEData(cveId);
    res.status(200).json(data);
  } catch (error) {
    console.error(`[CVE Error] ${error.message}`);
    res.status(500).json({ error: 'Error fetching CVE data' });
  }
};
