## Project Overview:
This project focuses on the manual deployment and securing of a web server without containerization(No Docker). The goal is to demonstrate deep expertise in System administration, DevOps and DevSecOps by building a secured and robust "Bare metal" infrastructure.

## Attribution: 
Big part of backend logic based on [this Habr article](https://habr.com/ru/companies/otus/articles/828684/).

## Attention: 
Some files are included for demonstration purposes and should not be present in production repositories. See the docs directory for more information.

## Documentation
* [Deployment Guide](docs/getting-started.md) — How to install on a server.
* [Environment Setup](docs/env-setup.md) — How to configure .env.

## Project 
* Tech Stack: JavaScript, PostgreSQL, Nginx.
* Assemblers: None.
* OS: Ubuntu.

### General project plan:
1. Manual deployment on tech stack above on Ubuntu.
2. Clean separation between user and admin interfaces.
    * 2.1 Ensure no availability to admin address for 3rd faces.
3. Nginx configuration and reusable snippets in /nginx/snippets/
4. Development of four 'check scripts' - a custom shell script for security risk assessment.
5. Systemd configure via custom unit files. 
    * 5.1 Auto-restart policies for various failure cases.
    * 5.2 Setting resource limits and depends.
6. Setup guide and scripts.

### Nginx configuration plan:
1. Use 'include' directive, for granular location management.
   * 1.1 Enable and tune request caching parameters.
   * 1.2 Implement IP-based blacklist/filtering. 
2. Switch worker processes in auto mode.
3. Redirect traffic from 80 to 443 port.
4. Hide nginx version details in HTTP headers and "error_pages".
5. Cofigure the level of logging for different locations.
6. Implement multiple compression algorithms.
7. Configure two-factor RPS limits.
   * 7.1 Different limits for admin and user.
8. Mask the status code from 503 to 404.
9. Enable mapping.
