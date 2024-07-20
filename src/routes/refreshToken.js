const express = require('express');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prismaClient');
const { generateToken, generateRefreshToken } = require('../utils/tokenService');

const router = express.Router();

router.post('/', async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(400).json({ message: 'No refresh token provided' });

    try {
        const storedToken = await prisma.refreshToken.findUnique({
            where: { token: refreshToken },
        });

        if (!storedToken) return res.status(403).json({ message: 'Invalid refresh token' });

        // Check if the token is expired
        if (new Date(storedToken.expiresAt) < new Date()) {
            await prisma.refreshToken.delete({ where: { token: refreshToken } });
            return res.status(403).json({ message: 'Refresh token expired' });
        }

        // Generate new JWT
        const newToken = generateToken(storedToken.userId);
        const newRefreshToken = generateRefreshToken(storedToken.userId);

        await prisma.refreshToken.create({
            data: {
                token: newRefreshToken,
                userId: storedToken.userId,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            },
        });

        res.json({ token: newToken, refreshToken: newRefreshToken });
    } catch (err) {
        console.error('Error in /refresh-token:', err);
        res.status(500).json({ message: 'Database error', error: err.message });
    }
});

module.exports = router;
