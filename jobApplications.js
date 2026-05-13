const { DataTypes } = require('sequelize');
const sequelize = require('./config/database'); // Ensure this points to your Sequelize instance

const Job = sequelize.define('Job', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    salary: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    skills: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'jobs', // Ensure this matches your database table name
    timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = Job;
