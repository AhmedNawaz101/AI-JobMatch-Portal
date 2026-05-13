const express = require('express');
const { sendMessage, getMessages } = require('./controllers/messageController');
const { authenticate } = require('./authMiddleware');

const router = express.Router();

// Send a message
router.post('/', authenticate, sendMessage);

// Get messages between two users
router.get('/:recipientId', authenticate, getMessages);

module.exports = router;
