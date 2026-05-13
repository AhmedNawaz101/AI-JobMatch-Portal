const express = require('express');
const { getNotifications, markAsRead } = require('./controllers/notificationController');
const { authenticate } = require('./authMiddleware');

const router = express.Router();

// Fetch notifications
router.get('/', authenticate, getNotifications);

// Mark a notification as read
router.put('/:id', authenticate, markAsRead);

module.exports = router;
