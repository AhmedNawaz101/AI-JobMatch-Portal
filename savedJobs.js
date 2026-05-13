const { DataTypes } = require('sequelize');
const sequelize = require('./config/database');
const Job = require('./jobs'); // Import the updated Job model

const SavedJob = sequelize.define('SavedJob', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    jobId: { // Map to the "job_id" column in the job_listings table
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Job,
            key: 'job_id', // Reference the correct column name
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'saved_jobs',
    timestamps: false, // Disable createdAt and updatedAt
});

SavedJob.belongsTo(Job, { foreignKey: 'jobId', as: 'job' });

module.exports = SavedJob;
