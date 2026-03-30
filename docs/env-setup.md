# Attention: 
Execute 'env-setup.sh' in ./scripts directory. Otherwise scripts wont be found.

# Environment setup and automation guide
This documentation outlines the process of configuring the environment variables, directory structures and security audit tools for the project. 

## Automated environment setup
What the script does: Creates a strict nginx hierarchy(/snippets, /sites, /ssl), cache optimization(/var/cache/nginx with www-data ownership), security automation(generate a dummy SSL certificate for 444 IP-drop policies, install four custom security audit scripts to /usr/local/bin), dynamic configuration updates with actual domain name using 'sed' stream editing, create .log files with 640 permissions.

## Usage
Run: 'sudo bash env-setup.sh <yourdomain.com>'

# Security audit suite
One the setup script is executed, the following tools become available globally. 

Services:
* nginx-check.sh - Verify SSL protocols, security headers and rate-limiting zones.
* node-check.sh - Checks if Node.js is running as root and audits package.json vulnerabilities.
* postgre-check.sh - Ensures the database is not exposed to the public web and checks for 'trust' auth methods.