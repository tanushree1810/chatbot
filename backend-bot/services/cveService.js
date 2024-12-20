import axios from 'axios';

/**
 * Fetch CVE data using the NVD API
 * @param {string} cveId - The CVE ID to fetch data for (e.g., "CVE-2023-1234").
 * @returns {Object} - CVE data from the NVD API.
 */
export const getCVEData = async (cveId) => {
  try {
    const apiKey = process.env.CVE_API_KEY || ''; // Replace with your API key or leave blank if not required
    const baseUrl = 'https://services.nvd.nist.gov/rest/json/cves/2.0';
    const url = `${baseUrl}?cveId=${cveId}`; // Using API version 2.0

    console.log(`[CVE Service] Fetching CVE data for ID: ${cveId}`);

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'CVE-Fetcher',
        ...(apiKey && { 'apiKey': apiKey }), // Include API key only if provided
      },
    });

    console.log('[CVE Service] CVE data fetched successfully');
    return response.data;
  } catch (error) {
    console.error(`[CVE Service Error] ${error.message}`);
    throw new Error('Error fetching CVE data. Please verify the CVE ID and API configuration.');
  }
};
