Big part of backend logic based on [this Habr article](https://habr.com/ru/companies/otus/articles/828684/).

# .env
The project contains a .env file used to store environment variables. 

Important: This repository is intended as a GUIDE PROJECT, therefore the .env file SHOULD NOT BE COMMITED to a remote repository due to security reasons. Make sure it is added to .gitignore.

# Project Structure

### src/db/postres.js
Configuration file responsible for setting up the PostgreSQL connection using environment variables.

### server.js
Application entry point. Initializes the server, trust nginx proxy, loads middleware and registers routes.

### src/routes/health.js
Route used for database health checks.

### src/routes/dbroutes.js
Defines API routes related to database operations. Incoming HTTP requests are forwarded to the appropriate controller.

### src/controllers/userController.js
Contains the bussiness logic for database operations related to users. Uses the database connection defined in src/db/postgres.js

### src/models/userModel.js
Defines the logic to interact with database table structure and data.

# Middleware

### middleware/validateUser.js
Middleware that validates user input data before it reaches the controller.

### middleware/logger.js
Middleware responsible for logging applicaion activity.

### middleware/errorHandler.js
Centralized error handling and logging logic.

# Dependencies

### package.json / package-lock.json
Contain the Node.js project dependencies and project metadata.

