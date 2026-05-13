require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./config/database'); // Database configuration
const userRoutes = require('./userROutes'); // User routes
const jobRoutes = require('./jobRoutes'); // Job routes
const applicationRoutes = require('./applicationRoutes'); // Application routes
const notificationRoutes = require('./notificationRoute'); // Notification routes
const messageRoutes = require('./messageRoutes'); // Message routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json()); // Parse JSON requests
app.use(cors({
    origin: true, // Allow all origins in development
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
})); // Enable CORS with specific options

// Routes
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/jobs', jobRoutes); // Job-related routes
app.use('/api/applications', applicationRoutes); // Application-related routes
app.use('/api/notifications', notificationRoutes); // Notification-related routes
app.use('/api/messages', messageRoutes); // Message-related routes

// Default route
app.get('/', (req, res) => {
    res.send('AI Job Recommendation System Backend is running');
});

// Test database connection
sequelize.authenticate()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch((err) => console.error('Error connecting to PostgreSQL:', err));

// First, sync without altering (to ensure connection works)
sequelize.sync({ force: false, alter: false })
    .then(async () => {
        console.log('Initial sync complete');
        try {
            // Add all required columns with defaults
            await sequelize.query(`
                DO $$ 
                BEGIN 
                    -- Add role column if it doesn't exist
                    IF NOT EXISTS (
                        SELECT column_name 
                        FROM information_schema.columns 
                        WHERE table_name='users' AND column_name='role'
                    ) THEN 
                        ALTER TABLE users ADD COLUMN role VARCHAR(255) DEFAULT 'job_seeker';
                    END IF;

                    -- Add timestamp columns if they don't exist
                    IF NOT EXISTS (
                        SELECT column_name 
                        FROM information_schema.columns 
                        WHERE table_name='users' AND column_name='createdAt'
                    ) THEN 
                        ALTER TABLE users ADD COLUMN "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
                    END IF;

                    IF NOT EXISTS (
                        SELECT column_name 
                        FROM information_schema.columns 
                        WHERE table_name='users' AND column_name='updatedAt'
                    ) THEN 
                        ALTER TABLE users ADD COLUMN "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
                    END IF;

                    -- Update any null timestamps
                    UPDATE users SET "createdAt" = CURRENT_TIMESTAMP WHERE "createdAt" IS NULL;
                    UPDATE users SET "updatedAt" = CURRENT_TIMESTAMP WHERE "updatedAt" IS NULL;
                END $$;
            `);
            console.log('Ensured all required columns exist with defaults');
            
            // Now sync without altering anything
            return sequelize.sync({ force: false, alter: false });
        } catch (error) {
            console.error('Error updating schema:', error);
        }
    })
    .then(() => console.log('Database synced successfully'))
    .catch((err) => console.error('Error syncing database:', err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
