const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'ts-auth-service-1818',
        version: '0.0.1',
        description: 'This project is an authentication service built using Node.js, Express, and Prisma. It handles user registration, login, token management, and more.',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
};

// Options for the swagger docs
const options = {
    swaggerDefinition,
    apis: ['./routes/*'], // This should point to your routes folder
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsDoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec,
};