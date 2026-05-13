# AI JobMatch Portal

A backend service for a job recommendation and application platform. This project supports user authentication, job listings, applications, saved jobs, notifications, and messaging through a REST API.

## Technologies Used

- Node.js
- Express
- Sequelize
- PostgreSQL
- bcrypt
- dotenv
- body-parser
- cors
- jsonwebtoken

## Features

- User login and role validation
- Job listing and creation
- Save jobs and apply for jobs
- Notifications and messaging endpoints
- Sequelize ORM for PostgreSQL database access

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a PostgreSQL database and configure connection values.

3. Add a `.env` file to the project root with values like:

   ```env
   DB_NAME=job_recommendation
   DB_USER=job_userr
   DB_PASSWORD=0000
   DB_HOST=localhost
   PORT=5000
   ```

4. Start the server:

   ```bash
   node server.js
   ```

5. The API will be available at:

   ```
   http://localhost:5000
   ```

## Notes

- The service depends on PostgreSQL being available and accepting connections.
- Some route controller implementations are currently stubbed and may need completion for full functionality.

## Suggested GitHub Repository Name

- `ai-jobmatch-portal`

## License

MIT
