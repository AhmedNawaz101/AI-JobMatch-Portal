-- Database Schema for AI Job Recommendation System

-- 1. USERS Table
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    user_type VARCHAR(20) CHECK (user_type IN ('job_seeker', 'recruiter', 'admin'))
);
-- USERS
--INSERT INTO Users (name, email, password, user_type) VALUES
--('Ali Raza', 'ali@email.com', 'pass123', 'job_seeker'),
--('Fatima Sheikh', 'fatima@email.com', 'pass123', 'job_seeker'),
--('Ahmed Khan', 'ahmed@email.com', 'pass123', 'recruiter'),
--('Sara Malik', 'sara@email.com', 'pass123', 'recruiter'),
--('Admin1', 'admin1@email.com', 'admin123', 'admin');
drop table users;


-- 2. USER_PROFILE Table
CREATE TABLE User_Profile (
    profile_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    resume_link TEXT,
    skills TEXT,
    experience_level VARCHAR(50),
    education TEXT,
    location_preference VARCHAR(100),
    job_preference VARCHAR(100)
);
drop table user_profile;
-- USER_PROFILE
--INSERT INTO User_Profile (user_id, resume_link, skills, experience_level, education, location_preference, job_preference) VALUES
--(1, 'link1.pdf', 'Python, SQL', 'Intermediate', 'BS CS', 'Lahore', 'Backend Developer'),
--(2, 'link2.pdf', 'JavaScript, React', 'Entry', 'BS SE', 'Karachi', 'Frontend Developer');


-- 3. JOB_SEEKERS Table
CREATE TABLE Job_Seekers (
    profile_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    resume_link TEXT,
    skills TEXT,
    experience_level VARCHAR(50),
    education TEXT,
    location_preference VARCHAR(100),
    job_preference VARCHAR(100)
);
drop table Job_Seekers;
-- JOB_SEEKERS
--INSERT INTO Job_Seekers (user_id, resume_link, skills, experience_level, education, location_preference, job_preference) VALUES
--(1, 'link1.pdf', 'Python, SQL', 'Intermediate', 'BS CS', 'Lahore', 'Backend Developer'),
--(2, 'link2.pdf', 'JavaScript, React', 'Entry', 'BS SE', 'Karachi', 'Frontend Developer');



-- 4. RECRUITERS Table
CREATE TABLE Recruiters (
    recruiter_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    company_name VARCHAR(100),
    company_website TEXT,
    job_post_limit INT,
    industry VARCHAR(50),
    company_location VARCHAR(100),
    verified_status BOOLEAN
);
drop table Recruiters;
-- RECRUITERS
--INSERT INTO Recruiters (user_id, company_name, company_website, job_post_limit, industry, company_location, verified_status) VALUES
--(3, 'TechSoft', 'www.techsoft.com', 10, 'IT', 'Islamabad', TRUE),
--(4, 'Innova', 'www.innova.com', 5, 'Software', 'Lahore', TRUE);



-- 5. ADMINS Table
CREATE TABLE Admins (
    admin_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    role VARCHAR(50),
    permissions TEXT
);
drop table admins;
-- ADMINS
--INSERT INTO Admins (user_id, role, permissions) VALUES
--(5, 'System Admin', 'ALL');



-- 6. JOB_LISTINGS Table
CREATE TABLE Job_Listings (
    job_id SERIAL PRIMARY KEY,
    recruiter_id INT REFERENCES Recruiters(recruiter_id),
    job_title VARCHAR(100),
    company_name VARCHAR(100),
    job_description TEXT,
    required_skills TEXT,
    salary_range VARCHAR(50),
    job_type VARCHAR(50),
    location VARCHAR(100),
    status VARCHAR(20)
);
drop table Job_Listings;
-- JOB_LISTINGS
--INSERT INTO Job_Listings (recruiter_id, job_title, company_name, job_description, required_skills, salary_range, job_type, location, status) VALUES
--(1, 'Backend Developer', 'TechSoft', 'Develop backend systems', 'Python, Django', '80k-100k', 'Full-time', 'Islamabad', 'Open'),
--(2, 'Frontend Developer', 'Innova', 'Develop user interfaces', 'React, JS', '60k-90k', 'Part-time', 'Lahore', 'Open');




-- 7. JOB_APPLICATIONS Table
CREATE TABLE Job_Applications (
    application_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    job_id INT REFERENCES Job_Listings(job_id),
    status VARCHAR(50)
);
drop table Job_Applications;
-- JOB_APPLICATIONS
--INSERT INTO Job_Applications (user_id, job_id, status) VALUES
--(1, 1, 'Applied'),(2, 2, 'Applied');



-- 8. AI_RECOMMENDATIONS Table
CREATE TABLE AI_Recommendations (
    recommendation_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    job_id INT REFERENCES Job_Listings(job_id),
    match_score FLOAT
);
drop table AI_Recommendations;
-- AI_RECOMMENDATIONS
--INSERT INTO AI_Recommendations (user_id, job_id, match_score) VALUES
--(1, 1, 0.88),(2, 2, 0.91);



-- 9. SAVED_JOBS Table
CREATE TABLE Saved_Jobs (
    saved_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    job_id INT REFERENCES Job_Listings(job_id)
);
drop table saved_jobs;
-- SAVED_JOBS
--INSERT INTO Saved_Jobs (user_id, job_id) VALUES
--(1, 2),(2, 1);



-- 10. EMPLOYER_REVIEWS Table
CREATE TABLE Employer_Reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    recruiter_id INT REFERENCES Recruiters(recruiter_id),
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review TEXT
);
drop table employer_reviews;
-- EMPLOYER_REVIEWS
--INSERT INTO Employer_Reviews (user_id, recruiter_id, rating, review) VALUES
--(1, 1, 4, 'Great communication and clarity'),
--(2, 2, 5, 'Smooth process and quick feedback');