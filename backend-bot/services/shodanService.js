import axios from 'axios';

export const getShodanData = async (ip) => {
  try {
    const apiKey = process.env.SHODAN_API_KEY;
    const url = `https://api.shodan.io/shodan/host/${ip}?key=${apiKey}`;

    console.log(`[Shodan Service] Fetching data for IP: ${ip}`);

    const response = await axios.get(url);

    console.log('[Shodan Service] Shodan data fetched successfully');
    return response.data;
  } catch (error) {
    console.error(`[Shodan Service Error] ${error.message}`);
    throw new Error('Error fetching Shodan data');
  }
};
