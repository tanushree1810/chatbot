export const errorHandler = (err, req, res, next) => {
    console.error(`[Error Middleware] ${err.message}`);
    res.status(500).json({ error: 'Something went wrong!' });
  };
  