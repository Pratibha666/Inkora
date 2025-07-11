import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  
  if (token == null) {
    return res.status(400).json({
      message: "Authentication token required",
      error: true,
      success: false,
    });
  }

  
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      console.log('eee', err.message);

      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          message: "Token expired. Please login again",
          error: err.message,
          success: false,
        });
      }

      return res.status(403).json({
        message: "Invalid token",
        error: err.message,
        success: false,
      });
    }

      req.user = user.authClaims[0];
      console.log("decoded jwt ",user)
    next();
  });
};  