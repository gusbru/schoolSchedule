#!/bin/bash


## Stopping the dockers
docker stop some-nginx
docker stop frontend
docker stop backend
docker stop some-mongo

# Delete the old repo
sudo rm -rf /home/ec2-user/cpsc2650-project

# any future command that fails will exit the script
set -e

# BE SURE TO UPDATE THE FOLLOWING LINE WITH THE URL FOR YOUR REPO
git clone git@gitlab.com:gusbru/cpsc2650-project.git

cd /home/ec2-user/cpsc2650-project
git checkout test

# copy .env backend 
cp ../env/env_backend/env ./backend/.env
cp ../env/env_frontend/env ./frontend/.env

# start the containers
./adminScripts/start-mongo-container.sh
./adminScripts/start-backend-container.sh -d
./adminScripts/start-frontend-container.sh -d
./adminScripts/start-nginx-container-test.sh -d