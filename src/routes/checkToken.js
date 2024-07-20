const express = require('express');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prismaClient');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, username: true }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;