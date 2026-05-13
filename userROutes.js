const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./Users');
const sequelize = require('./config/database');

// Login Endpoint
router.post('/login', async (req, res) => {
    const { email, password, role } = req.body;

    console.log('Login attempt details:', { 
        email, 
        role,
        roleType: typeof role,
        roleValue: role.toString()
    });

    try {
        // Find user by email
        const user = await User.findOne({ where: { email } });
        console.log('User details from DB:', user ? {
            email: user.email,
            role: user.role,
            roleType: typeof user.role,
            roleValue: user.role.toString()
        } : 'User not found');

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Define role relationships
        const validRolePairs = {
            'job_seeker': ['applicant'],
            'recruiter': ['employer', 'recruiter'],
            'admin': ['admin']
        };

        // Check if the frontend role is valid for this user's database role
        const isValidRole = validRolePairs[user.role]?.includes(role);
        console.log('Role validation:', {
            userRole: user.role,
            frontendRole: role,
            validRolesForUser: validRolePairs[user.role],
            isValid: isValidRole
        });

        if (!isValidRole) {
            return res.status(403).json({ 
                message: 'Invalid role for this user',
                userRole: user.role,
                attemptedRole: role,
                validRoles: validRolePairs[user.role]
            });
        }

        // Validate password
        let isValidPassword;
        if (user.password.startsWith('$2b$') || user.password.startsWith('$2a$')) {
            isValidPassword = await bcrypt.compare(password, user.password);
        } else {
            isValidPassword = password === user.password;
        }

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Respond with user data
        const userData = {
            id: user.user_id,
            email: user.email,
            role: role,
            name: user.name || ''
        };

        console.log('Login successful:', userData);
        res.status(200).json({ data: userData });
    } catch (error) {
        console.error('Login error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        res.status(500).json({ message: 'Server error during login' });
    }
});

router.get('/data', async (req, res) => {
    try {
        const users = await User.findAll(); // Replace with the appropriate query
        res.status(200).json({ data: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching data' });
    }
});

// Update user role
router.put('/update-role', async (req, res) => {
    const { email, role } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate the role
        const validRoles = ['job_seeker', 'recruiter', 'admin'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ 
                message: 'Invalid role provided',
                validRoles: validRoles
            });
        }

        // Update the user's role
        await user.update({ role });

        res.status(200).json({ 
            message: 'User role updated successfully',
            data: {
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ message: 'Server error while updating role' });
    }
});

// Temporary route to fix Jane's role
router.get('/fix-jane-role', async (req, res) => {
    try {
        // Direct SQL query to update Jane's role
        await sequelize.query(
            "UPDATE users SET role = 'recruiter' WHERE email = 'jane.smith@example.com'",
            { type: sequelize.QueryTypes.UPDATE }
        );
        
        // Verify the update
        const user = await User.findOne({ where: { email: 'jane.smith@example.com' } });
        
        res.json({
            message: 'Role updated',
            user: user ? user.toJSON() : null
        });
    } catch (error) {
        console.error('Error fixing role:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
