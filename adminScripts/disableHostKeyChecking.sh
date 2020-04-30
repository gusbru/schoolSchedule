#!/bin/bash
# This the the prompt we get whenever we ssh into the box and get the message like this
#
# The authenticity of the host 'ip address' cannot be verified....
#
# Below script will disable that prompt

# note ">>". It creates a file if it does not exits.
# The file content we want is below
#
# Host *
#   StrictHostKeyChecking no
#

# any future command that fails will exit the script
set -e
echo "Start disableHostKeyChecking..."
mkdir -p ~/.ssh
echo "directory created"
touch ~/.ssh/config
echo "config file created"
echo -e "Host *\n\tStrictHostKeyChecking no\n\n" >> ~/.ssh/config
echo "config file written"