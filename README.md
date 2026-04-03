## Project Overview:
This project is containerized evolution of my previous "bare metal" deployment. The primary goal is to re-engineer the infrasructure using docker orchestration and security.

## Attribution: 
* [Base project (NoDocker_SecuredProject)](https://github.com/axenoy/NoDocker_SecuredProject)

## Attention: 
Some files are included for demonstration purposes and should not be present in production repositories.

## Differences from base project:
* Replaced 'systemd' units and manual OS setup with docker-compose and optimized Dockerfiles.
* Manual 'ufw/sysctl' is replaced by OCI Seccomp profiles, linux capabilities dropping and network isolation.
* Legacy '*-check.sh' scripts integrated into docker-healthcheck instructions.

## Documentation:
[Docker information](docs/docker-info.md) - Docker information.
[Docker deployment guide](docs/getting-started.md) - Startup instructions.

## Project tech stack:
* OS: Ubuntu.
* Runtime: Node.js:20.
* Database: PostgreSQL:16.
* Reverse Proxy: Nginx:stable-alpine.
* Orchestration: Docker-compose.
* Security: Seccomp, linux capabilities, hadolint.
* Monitoring: Prometheus, grafana, node exporter.

### General project plan:
1. Utilize the [base project](https://github.com/axenoy/NoDocker_SecuredProject).
2. Develop optimized Dockerfiles for each project service using best practises.
3. Develop a robust docker-compose file using best practises.
4. Develop startup guide.

### Docker plan:
1. Containerizaion and layer optimization:
    * 1.1 Implement multi-stage dockerfiles for Node.js, frontend and nginx using pinned versions of alpine-based images.
    * 1.2 Configure .dockerignore to prevent sensitive data and unnecessary files from entering the build context.
2. Orchestration and network isolation:
    * 2.1 Orchestration via docker-compose.
    * 2.2 Division into dedicated frontend and backend network.
    * 2.3 Disable external network access for containers to reduce attack surface.
    * 2.4 Configure restart policy for automated service recovery.
    * 2.5 Implement strict limits for CPU, RAM and PIDs.
    * 2.6 Implement guaranteed hardware resource reservation for critical services.
3. Security:
    * 3.1 Drop all app capabilities via 'cap_drop: [ALL]' command execution and enable required only.
    * 3.2 Trace application syscalls using 'sysdig', generate a profile in logging mode, and create a whitelist via OCI seccomp generator.
    * 3.3 Set up non-root user and change his group in container.
    * 3.4 Privilege escalataion prevention.
    * 3.5 Mount configuration files and directories with read-only permissions.
4. Custom health-check integrity:
    * 4.1 Implement via specialized scripts.
    * 4.2 Utilize dockerfile healhcheck instructions.
5. Data persistence and environment:
    * 5.1 Set up docker volumes for persistent and secure PostgreSQL data storage.
    * 5.2 Use /docker-entrypoint-initdb.d/ for auromatic database schema initialization.
    * 5.3 Centralize configuration management via .env file.
6. Enable hadolint.
7. Enable logging.