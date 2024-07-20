const csrf = require('csurf');

// Middleware for generating and validating CSRF tokens
const csrfMiddleware = csrf({ cookie: false });

const csrfProtection = (req, res, next) => {
  csrfMiddleware(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: 'CSRF protection error' });
    }
    next();
  });
};

module.exports = csrfProtection;
