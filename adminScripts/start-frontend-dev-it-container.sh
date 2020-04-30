#!/bin/bash
docker run -it --network my-net --name frontend --rm $1 \
        -v $PWD/frontend:/mnt/frontend \
        -w /mnt/frontend node:alpine sh
