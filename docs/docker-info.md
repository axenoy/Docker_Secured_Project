# DOCKER
## Used features and explanations
The project utilizes multi-stage builds to ensure the final production images are as lean as possible. I use an initial stage(e.g node:20-bookword-slim AS build) to install dependencies and compile assets, then COPY only the necessary artifacts into a fresh, clean runtime image.

## Image selection
Slim and apline variants are used to maintain a minimal foorprint:
* Backend - node:20-bookworm-slim - small size and compatibility with Debian-based tools.
* Nginx - nginx:stable-alpine - standard for high-performance.
* Database - postgres:16-alpine - the smallest possible footprint for a fully functional postgresql instance.

# Backend
## Non-root execution and privilege escalation prevention
By default docker containers run as root. To reduce risks, I created a dedicated system group and user, changed ownership of application directory and swithed runtime context using the USER directive.

## Healthcheck
Used self-written JavaScript health-check script. Called by curl in dockerfile.

# Database initialization
The PostgreSQL image is configured to automatically initialize the database structure. 
* Entrypoint where all sql scripts that located in ./schema.sql are copied to /docker-entrypoint-initdb.d/. 
Then we change permission for directory files
* I execute RUN chmod 755 to ensure the PostgreSQL engine has the necessary rights to read and execute the schema during the first boot.

# Proxy(Nginx)
The container runs in read-only mode, with specific tmpfs mounts for data.

# Orchestration
## Docker-compose
There are resource limits and reservations, network isolation and environment management via .env.

## .dockerignore
Default ignore file which ensure sensitive and other data cannot be appear in container.