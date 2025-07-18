const jwt = require("jsonwebtoken");

// In production, always use environment variables for secrets
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key_here";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token exists and is a Bearer token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Store the user info in request for use in routes
    req.user = decoded;

    next(); // Proceed to next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
