# ATTENTION
This guide assumes a Debian-based distribution using 'apt'. Command syntax may vary for other distributions.

## Environment preparation

### Git installation
* sudo apt update
* sudo apt install git -y
* git --version
  
### Clone project
* cd ~/needed_directory
* git clone https://github.com/axenoy/NoDocker_SecuredProject.git
* cd NoDocker_SecuredProject

## Core stack installation

### Nginx (web server)
* sudo apt install nginx -y
* sudo systemctl status nginx

### Node.js and NPM (backend runtime)
* sudo apt install nodejs npm
* node -v && npm -v

### PostgreSQL (database)
* sudo apt install postgresql -y - PostgreSQL 16 will be installed. 
* sudo -i -u postgres - Enter PostgreSQL shell.
* psql - Open interface
* psql --version - Check current version

# Attention 
.env file should not be in remote repository, carefully read README.MD.
That this config variables must be in .env file(NoDocker_SecuredProject/backend/.env)

## Database configuration

### Create user and database
* sudo -i -u postgres
* psql
#### Inside the psql interface
* CREATE USER nodocker WITH PASSWORD 'testpswd';
* CREATE DATABASE testdb OWNER nodocker;
* \q
### Security hardering(pg_hba.conf)
Switch from 'peer' to 'md5' to enforce password-based authentication.
* sudo nano /etc/postgresql/*/main/pg_hba.conf
* sudo systemctl daemon-reload
### Schema migration
Import the initial database structure
* cd ~/NoDocker_SecuredProject/sql && psql -U nodocker -d testdb -f schema.sql
* Enter 'testpswd' password when prompted.

## Backend and security setup
Install the required Node.js packages
* cd ~/NoDocker_SecuredProject/backend && npm install

## Network hardering(UFW)
* sudo ufw allow 22/tcp
* sudo ufw allow 80/tcp
* sudo ufw allow 443/tcp
* sudo ufw allow 3000/tcp
* sudo ufw enable
* sudo ufw status verbose

## Environment setup script
* cd ~/NoDocker_SecuredProject/scripts && chmod +x env-setup.sh
* sudo ./env-setup.sh yourdomain.com

## Systemd service deployment
Change user variables in 'Service' block
* sudo mv ~/NoDocker_SecuredProject/SYSTEMD/nodocker-backend.service /etc/systemd/system/
* sudo chown root:root /etc/systemd/system/nodocker-backend.service
* sudo chmod 644 /etc/systemd/system/nodocker-backend.service
* sudo systemctl daemon-reload
* sudo systemctl enable nodocker-backend.service
* sudo systemctl start nodocker-backend.service