CREATE USER job_user WITH PASSWORD '7410';
GRANT CONNECT ON DATABASE job_recommendation TO job_user;
GRANT ALL PRIVILEGES ON DATABASE job_recommendation TO job_user;

-- Insert dummy data into the Users table
INSERT INTO Users (name, email, password, user_type) VALUES
('Ali Raza', 'ali@email.com', 'pass123', 'job_seeker'),
('Fatima Sheikh', 'fatima@email.com', 'pass123', 'job_seeker'),
('Ahmed Khan', 'ahmed@email.com', 'pass123', 'recruiter'),
('Sara Malik', 'sara@email.com', 'pass123', 'recruiter'),
('Admin1', 'admin1@email.com', 'admin123', 'admin');