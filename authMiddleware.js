const jwt = require('jsonwebtoken');

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user data to the request object
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid authentication token' });
  }
};

// Role-based access control middleware
const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: You do not have access to this resource' });
    }
    next();
  };
};

// Export both middlewares
module.exports = {
  authenticate,
  authorize,
};
