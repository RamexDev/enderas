Project Technical Architecture & Environment Rules

Backend Stack

* Node.js
* Express.js
* Pure JavaScript (No TypeScript)

Frontend Stack

* Vite
* Modern frontend architecture
* Clean component structure
* Scalable folder organization

Database

* MySQL
* Sequelize ORM
* No Prisma

Environment Variable Rules

* No hardcoded values anywhere in the project
* Every configurable value must come from the `.env` file
* All secrets, credentials, URLs, ports, tokens, database configurations, and external service keys must be environment-based
* Database connection must dynamically use environment variables
* Database name must NEVER be hardcoded
* The system must support changing database credentials and database names directly from `.env` without modifying source code
* All environments (development, staging, production) must be configurable independently

Required Environment Variables

* PORT
* NODE_ENV
* DB_HOST
* DB_PORT
* DB_NAME
* DB_USER
* DB_PASSWORD
* JWT_SECRET
* JWT_EXPIRES_IN
* CLIENT_URL
* API_BASE_URL
*others
Backend Architecture Rules

* Use clean and scalable architecture
* Use modular folder structure
* Separate:

  * models
  * controllers
  * services
  * middleware
  * routes
  * validations
  * utilities
  * configuration
* Keep controllers thin
* Business logic must be inside services
* Use centralized error handling
* Use async/await consistently
* Use reusable response utilities
* Use reusable validation patterns
* Use proper authentication and authorization middleware

Database Rules

* Use Sequelize associations properly
* Use migrations and seeders
* Include timestamps in all tables
* Use soft delete where necessary
* Use UUIDs where appropriate
* Maintain clean relational structure

Security Rules

* Hash passwords securely
* Protect sensitive routes with JWT authentication
* Validate all incoming requests
* Prevent SQL injection and common vulnerabilities
* Never expose sensitive environment variables to frontend

Code Quality Rules

* Write production-ready code
* Use consistent naming conventions
* Keep files modular and reusable
* Avoid duplicated logic
* Follow RESTful API principles
* Write maintainable and scalable code

Frontend Rules

* Use reusable components
* Use modular page structure
* Keep API calls centralized
* Use environment variables for API URLs
* No hardcoded backend URLs
* Build responsive layouts
* Keep clean state management structure

General Development Rules

* Build scalable enterprise-ready architecture
* Prioritize maintainability and readability
* Optimize for future feature expansion
* Keep the project clean for team collaboration
* Ensure deployment flexibility across different servers and database names
