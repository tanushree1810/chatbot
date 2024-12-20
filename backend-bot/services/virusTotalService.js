import axios from 'axios';

// Fetch VirusTotal Report for Files (Hash-based Analysis)
export const getVirusTotalFileReport = async (hash) => {
  try {
    const apiKey = process.env.VIRUSTOTAL_API_KEY;
    const url = `https://www.virustotal.com/api/v3/files/${hash}`;

    console.log(`[VirusTotal API] Fetching report for hash: ${hash}`);

    const response = await axios.get(url, {
      headers: { 'x-apikey': apiKey },
    });

    return response.data;
  } catch (error) {
    console.error(`[VirusTotal File API Error] ${error.message}`);
    throw new Error('Error fetching VirusTotal file report');
  }
};

// Fetch VirusTotal Report for URLs
export const getVirusTotalURLReport = async (url) => {
  try {
    const apiKey = process.env.VIRUSTOTAL_API_KEY;

    // Encode URL to base64
    const base64url = Buffer.from(url).toString('base64');
    const urlId = base64url.replace(/=/g, '');  // Remove the padding from base64

    console.log(`[VirusTotal API] Fetching report for URL ID: ${urlId}`);

    // Fetch the URL analysis report using the encoded URL ID
    const response = await axios.get(
      `https://www.virustotal.com/api/v3/urls/${urlId}`,
      { headers: { 'x-apikey': apiKey } }
    );

    return response.data;
  } catch (error) {
    console.error(`[VirusTotal URL API Error] ${error.message}`);
    throw new Error('Error fetching VirusTotal URL report');
  }
};

// Fetch VirusTotal Report for IP Addresses
export const getVirusTotalIPReport = async (ip) => {
  try {
    const apiKey = process.env.VIRUSTOTAL_API_KEY;
    const url = `https://www.virustotal.com/api/v3/ip_addresses/${ip}`;

    console.log(`[VirusTotal API] Fetching report for IP: ${ip}`);

    const response = await axios.get(url, {
      headers: { 'x-apikey': apiKey },
    });

    return response.data;
  } catch (error) {
    console.error(`[VirusTotal IP API Error] ${error.message}`);
    throw new Error('Error fetching VirusTotal IP report');
  }
};
