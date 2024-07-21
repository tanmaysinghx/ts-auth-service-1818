const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger'); // Adjust the import based on your setup
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Read the JWT secret from the file
const jwtSecretPath = path.join(__dirname, 'certicificates', 'jwt-secret.key');
const jwtSecret = fs.readFileSync(jwtSecretPath, 'utf8').trim();

// Set the JWT_SECRET environment variable
process.env.JWT_SECRET = jwtSecret;

// Routes
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const checkTokenRoute = require('./routes/checkToken');
const refreshTokenRoute = require('./routes/refreshToken');

app.use('/auth', authRoutes); // Handles routes like /auth/register and /auth/login
app.use('/protected', protectedRoutes); // Handles routes that need authentication
app.use('/check-token', checkTokenRoute); // For /check-token endpoint
app.use('/refresh-token', refreshTokenRoute); // For /refresh-token endpoint

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
