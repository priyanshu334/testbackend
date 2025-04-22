const jwt = require("jsonwebtoken");

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication token missing or malformed" });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET || "your_secret_key";

    const decoded = jwt.verify(token, secret);
    req.user = decoded; // Attach user info to the request object
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { isAuthenticated };
