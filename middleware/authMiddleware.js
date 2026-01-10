/**
 * Middleware to verify secret word from request body
 */
export const verifySecret = (req, res, next) => {
  const { secret } = req.body;

  if (!secret) {
    return res.status(401).json({
      message: "Secret word is required",
    });
  }

  const expectedSecret = process.env.SECRET_WORD;

  if (!expectedSecret) {
    return res.status(500).json({
      message: "Server configuration error: SECRET_WORD not set",
    });
  }

  if (secret !== expectedSecret) {
    return res.status(403).json({
      message: "Invalid secret word",
    });
  }

  next();
};
