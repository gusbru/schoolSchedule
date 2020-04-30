#!/bin/sh
docker run --rm --network my-net --name some-mongo \
    -v db2:/data/db \
    -v configdb2:/data/configdb \
    -d mongo