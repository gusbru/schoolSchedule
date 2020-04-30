#!/bin/bash
docker run -it --rm --name certbot -p 80:80 \
            -v "/home/ec2-user/etc/letsencrypt:/etc/letsencrypt" \
            -v "/home/ec2-user/var/lib/letsencrypt:/var/lib/letsencrypt" \
            certbot/certbot certonly
