import axios from 'axios';

// aiController.js
export const getAIResponse = async (prompt) => {
  let retryDelay = 5000; // Declare with 'let' so it can be modified
  let retries = 3; // Retry up to 3 times

  while (retries > 0) {
    try {
      const apiKey = process.env.GROQ_API_KEY; // Your Groq API Key
      const url = 'https://api.groq.com/openai/v1/chat/completions'; // Groq Chat API endpoint

      console.log(`[AI Service] Sending prompt to AI: ${prompt}`);

      const response = await axios.post(
        url,
        {
          model: 'llama3-8b-8192', // Example model from Groq (adjust as necessary)
          messages: [
            {
              role: 'user',  // 'user' role for input
              content: prompt, // The user input prompt
            }
          ],
          max_tokens: 200,  // Adjust token limit as needed
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`, // Authorization header with Groq API key
          },
        }
      );

      console.log('[AI Service] AI response received successfully');
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 429) {
          // If rate-limited, retry after a delay
          console.log('[AI Service Error] Rate limited, retrying...');
          retries -= 1;
          if (retries > 0) {
            console.log(`Retrying in ${retryDelay / 1000} seconds...`);
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
            retryDelay *= 2; // Exponentially increase the retry delay
          } else {
            console.error('[AI Service Error] Exceeded retries');
            throw new Error('Rate limit exceeded after multiple retries');
          }
        } else {
          // For other errors, log them and exit
          console.error(`[AI Service Error] Status: ${error.response.status}, Data: ${error.response.data}`);
          throw error;
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('[AI Service Error] No response received:', error.request);
        throw error;
      } else {
        // Something else caused an error
        console.error(`[AI Service Error] ${error.message}`);
        throw error;
      }
    }
  }
};
