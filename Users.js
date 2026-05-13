const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./config/database');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'user_id'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'job_seeker',
        validate: {
            isIn: {
                args: [['job_seeker', 'recruiter', 'admin']],
                msg: 'Role must be either job_seeker, recruiter, or admin'
            }
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    tableName: 'users',
    timestamps: true
});

module.exports = User;
