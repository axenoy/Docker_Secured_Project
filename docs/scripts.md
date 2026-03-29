# Security audit suite
The security suite is designed as a modular toolkit for rapid risk assessment of the server infrastructure. To ensure isolation and prevent execution failures, the suite is divided into four functional blocks, each contained in a separate .sh script.

## Nginx audit
Focuses on the web perimeter, data leakage prevention and traffic filtering. Main features: Headers analysis, version detecting(server_tokens off), SSL/TLS versioning, limits scan(limit_req and limit_conn).

## Postgre audit
Ensures database integrity. Main features: Network availability(pg_hba.conf and listen_addresses), auth methods(password-less access), privileges, pots(firewall).

## Node.js 
Analyze the application runtime environment and scan for project-level vulnerabilities. Node process identify. Scan for exposed secrets in .env files and check for permissions. Auto start npm audit with filtering to catch high-severity dependency risks. 

## Server audit
General system-level auditing. Uses port scan tools to identify ports. Audit critical system files (/etc/shadow, /etc/sudoers, /etc/ssh/sshd_config) for overpermissive access. 