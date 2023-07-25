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

const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");

    if (!token) {
      return res.status(401).json({ msg: "Access denied" });
    }
    const verified = jwt.verify(token, process.env.tokenSecret);
    if (!verified) {
      return res.status(401).json({ msg: "Token Verify failed. Auth denied" });
    }
    req.user = verified.id;
    req.token = token;
    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = checkRole;
module.exports = auth;
