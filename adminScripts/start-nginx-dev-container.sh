#!/bin/sh

# THIS SCRIPT IS INTENDED TO BE RUN FROM THE PROJECT DIRECTORY

# ALSO ASSUMES THAT THE DIRECTORIES:
#   /home/ec2-user/etc/letsencrypt
#   /home/ec2-user/var/lib/letsenctrypt
# ALREADY EXIST

# $1 CAN EITHER BE -it FOR INTERACTIVE OR -d FOR DAEMON

docker run --network my-net --rm $1 --name some-nginx \
    -v $PWD/nginx-dev_conf:/etc/nginx/conf.d \
    -p 80:8080 -p 3030:3030\
    nginx:alpine
