// Middleware to check if the user has the right role (e.g., admin)
const isAdmin = (req, res, next) => {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Access denied, not an admin" });
    }
    next();
  };
  
  module.exports = { isAdmin };
  