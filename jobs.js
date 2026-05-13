const { DataTypes } = require('sequelize');
const sequelize = require('./config/database'); // Ensure this points to your Sequelize instance

const Job = sequelize.define('Job', {
    job_id: { // Primary key
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    recruiter_id: { // Map to the "recruiter_id" column
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    job_title: { // Map to the "job_title" column
        type: DataTypes.STRING,
        allowNull: false,
    },
    company_name: { // Map to the "company_name" column
        type: DataTypes.STRING,
        allowNull: false,
    },
    job_description: { // Map to the "job_description" column
        type: DataTypes.TEXT,
        allowNull: false,
    },
    required_skills: { // Map to the "required_skills" column
        type: DataTypes.STRING,
        allowNull: false,
    },
    salary_range: { // Map to the "salary_range" column
        type: DataTypes.STRING,
        allowNull: false,
    },
    job_type: { // Map to the "job_type" column
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: { // Map to the "location" column
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: { // Map to the "status" column
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'job_listings', // Ensure this matches your database table name
    timestamps: false, // Disable createdAt and updatedAt
});

module.exports = Job;
