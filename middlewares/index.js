const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

exports.authMiddleware = (req, res, next) => {
    // Get token from header
const token = req.header('x-auth-token');

// Check if not token
if (!token) {
  return res.status(401).json({ msg: 'No token, authorization denied' });
}

// Verify token
try {
  jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
    if (error) {
      return res.status(401).json({ msg: 'Token is not valid' });
    } else {
      req.user = await UserModel.findById(decoded._id);
      next();
    }
  });
} catch (err) {
  console.error('something wrong with auth middleware');
  res.status(500).json({ msg: 'Server Error' });
}
};

exports.adminMiddleware = async (req, res, next) => {
if (req.user.role !== 3) {
  return res.status(400).json({
      error: 'Admin resource. Access denied'
  });
};

next();
};

exports.blogMiddleware = async (req, res, next) => {
if (req.user.role !== 3 || req.user.role !== 2) {
  return res.status(400).json({
      error: 'Access denied'
  });
};

next();
};