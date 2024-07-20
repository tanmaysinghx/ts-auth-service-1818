const express = require('express');
const router = express.Router();
const csrfProtection = require('../middleware/csrfMiddleware');

router.use(csrfProtection);  // Use CSRF protection for this route

router.post('/some-route', (req, res) => {
  // Handle request here
  res.json({ message: 'Request successful' });
});

module.exports = router;
