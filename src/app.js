const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { swaggerUi, swaggerSpec } = require('./config/swagger');

dotenv.config();

const app = express();

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.json());

const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const checkTokenRoute = require('./routes/checkToken');
const refreshTokenRoute = require('./routes/refreshToken'); 

app.use('/auth', authRoutes); // Handles routes like /auth/register and /auth/login
app.use('/protected', protectedRoutes); // Handles routes that need authentication

app.use('/check-token', checkTokenRoute); // For /check-token endpoint
app.use('/refresh-token', refreshTokenRoute); // For /refresh-token endpoint

module.exports = app;
