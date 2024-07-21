const express = require('express');
const bcrypt = require('bcryptjs'); // Using bcryptjs for hashing
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prismaClient');
const { generateToken, generateRefreshToken } = require('../utils/tokenService');

const router = express.Router(); // Initialize the router

// Register Route
router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
            },
        });

        const refreshToken = generateRefreshToken(user.id);
        await prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId: user.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            },
        });

        res.status(201).json({ message: 'User registered successfully', userId: user.id });
    } catch (err) {
        console.error('Error in /register:', err); // Log error details
        res.status(500).json({ message: 'Database error', error: err.message });
    }
});

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Logs in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid input
 */
router.post('/login', async (req, res) => {
    const { emailOrUsername, password } = req.body;

    try {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: emailOrUsername },
                    { username: emailOrUsername },
                ],
            },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        await prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId: user.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            },
        });

        res.json({ message: 'Login successful', token, refreshToken });
    } catch (err) {
        console.error('Error in /login:', err); // Log error details
        res.status(500).json({ message: 'Database error', error: err.message });
    }
});

module.exports = router; // Export the router
