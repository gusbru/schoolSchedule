#!/bin/bash
docker run --network my-net --name backend --rm $1 \
        -v $PWD/backend:/mnt/backend \
        -w /mnt/backend node:alpine npm run firststart
