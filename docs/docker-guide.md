# DOCKER
## Used features and explanations
There are a quite good feature of using FROM variable. First FROM uses for downloading and second one for clear image installation, because docker forgives previous image, that clears cache and other stuff however we can use multistage(FROM node:20-bookworm-slim AS prod-deps) and copy needed one data(COPY --from=prod-deps) which reduces containers size. I would recommend you to read more about how containerization work with docker and without docker.

## Used images explanation
Bookworm-slim is light weight images without documentation, which reduces final container size. Alpine is the same, but there is no any image lighter than alpine for posgres.
* Backend - node:20-bookworm-slim
* Nginx - nginx:1.25-bookworm-slim
* Postgres - postgres:16-alpine

# Backend
## Why did I changed user and group?
Because by default user is root and that is not security safe for us, bacause exiting posibillity out of container.

## Healthcheck
Used self-written JavaScript health-check script. Called by curl via docker command.

# Database
You can see that enrtrypoints. That's default posgres image path of entrypoint.

* COPY ./schema.sql /docker-entrypoint-initdb.d/

Then we change permission for directory files
* RUN chmod 755 /docker-entrypoint-initdb.d/*

# Proxy(Nginx)
All was explained in previous docker files.

# Orchestration
## Docker-compose
After whitelist
