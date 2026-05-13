const express = require('express');
const router = express.Router();

// Controllers (to be implemented)
const { applyForJob, getApplications, updateApplicationStatus, getApplicants, searchCandidates, contactCandidate } = require('./controllers/applicationController');
const { authenticate, authorize } = require('./authMiddleware');

// Apply for a job
router.post('/:jobId', authenticate, applyForJob);

// Get applications for a user
router.get('/', authenticate, getApplications);

// Update application status and feedback
router.put('/:applicationId', authenticate, authorize(['recruiter', 'admin']), updateApplicationStatus);

// Route to fetch applicants for a specific job post
router.get('/job/:jobId/applicants', authenticate, getApplicants);

// Route to search and filter candidates for a job post
router.get('/job/:jobId/candidates', authenticate, searchCandidates);

// Route to contact a shortlisted candidate
router.post('/candidate/:candidateId/contact', authenticate, contactCandidate);

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, address, skills, experience, education, location, jobPreference } = req.body;

    try {
        const jobSeeker = await JobSeeker.findByPk(id);
        if (!jobSeeker) {
            return res.status(404).json({ message: 'Job seeker not found' });
        }

        // Update the job seeker information
        await jobSeeker.update({ name, age, address, skills, experience, education, location, jobPreference });
        res.status(200).json({ message: 'Personal information updated successfully', data: jobSeeker });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update personal information', error: error.message });
    }
});
module.exports = router;
