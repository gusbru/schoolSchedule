#!/bin/bash
docker run --network my-net --name frontend --rm $1 \
        -v $PWD/frontend:/mnt/frontend \
        -w /mnt/frontend node:alpine sh
