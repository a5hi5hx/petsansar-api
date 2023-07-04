const jwt = require('jsonwebtoken');

const checkRole = (requiredRoles) => {
  return (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized. Bearer token required.', success: false });
    }

    const token = bearerToken.split(' ')[1];

    jwt.verify(token, 'your-secret-key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized. Invalid token.', success: false });
      }

      const role  = decoded.role;

      if (!requiredRoles.includes(role)) {
        return res.status(403).json({ message: 'Forbidden. Insufficient role.', success: false });
      }

      // Role is valid, continue to the next middleware or route handler
      next();
    });
  };
};

module.exports = checkRole;
