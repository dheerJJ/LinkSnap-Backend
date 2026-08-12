const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ Message: 'Unauthorized', message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ Message: 'Token not found', message: 'Token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'linksnap_super_secret_jwt_key_change_in_production');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ Message: 'Invalid User', message: 'Invalid or expired token' });
  }
};

module.exports = auth;