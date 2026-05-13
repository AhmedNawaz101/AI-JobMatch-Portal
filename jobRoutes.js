const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('./authMiddleware');
const Job = require('./jobs'); // Ensure the Job model is defined and imported
const SavedJob = require('./savedJobs'); // Ensure the SavedJob model is defined and imported
const JobApplication = require('./jobApplications'); // Ensure the JobApplication model is defined and imported
// Endpoint to fetch all jobs
// Fetch all jobs
router.get('/', async (req, res) => {
    try {
        console.log('Fetching all job listings...');
        const jobs = await Job.findAll({
            attributes: [
                'job_id', 'recruiter_id', 'job_title', 'company_name',
                'job_description', 'required_skills', 'salary_range',
                'job_type', 'location', 'status'
            ]
        });
        
        console.log(`Found ${jobs.length} jobs`);
        
        // Map the jobs to ensure all required fields are present
        const mappedJobs = jobs.map(job => {
            const jobData = job.toJSON();
            console.log('Job data:', jobData);
            return jobData;
        });

        res.status(200).json({ data: mappedJobs });
    } catch (error) {
        console.error('Error fetching job listings:', error);
        res.status(500).json({ 
            message: 'Error fetching job listings',
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Create a new job
router.post('/', async (req, res) => {
    try {
        console.log('Creating new job with data:', req.body);
        const {
            job_title,
            company_name,
            job_description,
            salary_range,
            required_skills,
            location,
            job_type,
            recruiter_id,
            status
        } = req.body;

        // Validate required fields
        if (!job_title || !company_name || !job_description || !salary_range || !required_skills || !location || !job_type || !recruiter_id) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create the job
        const newJob = await Job.create({
            job_title,
            company_name,
            job_description,
            salary_range,
            required_skills,
            location,
            job_type,
            recruiter_id,
            status: status || 'Open'
        });

        console.log('Job created successfully:', newJob.toJSON());

        res.status(201).json({
            message: 'Job created successfully',
            data: newJob
        });
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({
            message: 'Failed to create job',
            error: error.message
        });
    }
});

// Endpoint to apply for a job
router.post('/apply', authenticate, authorize(['applicant']), async (req, res) => {
    const { jobId, userId } = req.body;

    if (!jobId || !userId) {
        return res.status(400).json({ message: 'Job ID and User ID are required' });
    }

    try {
        // Check if the application already exists
        const existingApplication = await JobApplication.findOne({ where: { jobId, userId } });
        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        // Create a new job application
        const application = await JobApplication.create({ jobId, userId });
        res.status(201).json({ message: 'Job application submitted successfully', data: application });
    } catch (error) {
        res.status(500).json({ message: 'Failed to apply for the job', error: error.message });
    }
});

// Endpoint to save a job
router.post('/save', authenticate, authorize(['applicant']), async (req, res) => {
    const { jobId, userId } = req.body;

    if (!jobId || !userId) {
        return res.status(400).json({ message: 'Job ID and User ID are required' });
    }

    try {
        // Check if the job is already saved
        const existingSavedJob = await SavedJob.findOne({ where: { jobId, userId } });
        if (existingSavedJob) {
            return res.status(400).json({ message: 'Job is already saved' });
        }

        // Save the job
        const savedJob = await SavedJob.create({ jobId, userId });
        res.status(201).json({ message: 'Job saved successfully', data: savedJob });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save the job', error: error.message });
    }
});

// Endpoint to remove a saved job
router.delete('/unsave', authenticate, authorize(['applicant']), async (req, res) => {
    const { jobId, userId } = req.body;

    if (!jobId || !userId) {
        return res.status(400).json({ message: 'Job ID and User ID are required' });
    }

    try {
        // Remove the saved job
        const deleted = await SavedJob.destroy({ where: { jobId, userId } });
        if (!deleted) {
            return res.status(404).json({ message: 'Saved job not found' });
        }

        res.status(200).json({ message: 'Job removed from saved jobs successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove the saved job', error: error.message });
    }
});

// Endpoint to fetch saved jobs
router.get('/saved', authenticate, authorize(['applicant']), async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const savedJobs = await SavedJob.findAll({
            where: { userId },
            include: [{ model: Job }], // Assuming Job is the related model
        });

        res.status(200).json({ data: savedJobs });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch saved jobs', error: error.message });
    }
});

// Export the router
module.exports = router;
