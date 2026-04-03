# Installation
## Clone the project
* git clone https://github.com/axenoy/Docker_Secured_Project
* cd Docker_Secured_Project

## Scripted docker services installation
* curl -fsSL https://get.docker.com -o get-docker.sh
* sudo sh get-docker.sh
* sudo usermod -aG docker $USER && newgrp docker

## Run the infrasructure
* sudo docker compose up -d --build

## Troubleshooting
* sudo docker compose ps
* sudo docker compose logs -f

## Auditing via linter (hadolint) 
Run the following command in the directory where your Dockerfile is located:
* docker run --rm -i hadolint/hadolint < Dockerfile