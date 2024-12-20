export const handleUserQuery = async (req, res) => {
    try {
      const { query } = req.body;
  
      if (!query) {
        console.warn('[User Query] Missing query in request body');
        return res.status(400).json({ error: 'Query is required' });
      }
  
      // Debug: Log received query
      console.log(`[User Query] Received: ${query}`);
  
      // Placeholder response
      res.status(200).json({ message: 'Query processed successfully', query });
    } catch (error) {
      console.error(`[User Query Error] ${error.message}`);
      res.status(500).json({ error: 'Error processing query' });
    }
  };
  