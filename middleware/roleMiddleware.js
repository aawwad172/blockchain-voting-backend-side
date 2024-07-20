const dotenv = require('dotenv');
dotenv.config();

const isAdmin = (req, res, next) => {
  if (req.user.role === 'admin' || req.user.email === process.env.SUPERADMIN_EMAIL) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

const isSuperadmin = (req, res, next) => {
  if (req.user.email === process.env.SUPERADMIN_EMAIL) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Superadmins only.' });
  }
};

module.exports = {
  isAdmin,
  isSuperadmin
};
