#!/bin/bash

# any future command that fails will exit the script
set -e

# disable the host key checking.
./adminScripts/disableHostKeyChecking.sh

# Lets write the public key of our aws instance
eval $(ssh-agent -s)
echo "$PRIVATE_TEST_KEY" | tr -d '\r' | ssh-add - > /dev/null

# ** Alternative approach
# echo -e "$PRIVATE_KEY" > ~/.ssh/id_rsa
# chmod 600 ~/.ssh/id_rsa
# ** End of alternative approach

# echo -e "$PRIVATE_KEY" > /root/name.pem
# chmod 600 /root/name.pem

# echo "pem file"
# cat /root/name.pem
echo "config"
cat ~/.ssh/config

echo $PWD
ls
echo "---"
ls /root

echo "deploying to ${TEST_SERVER}"
ssh ec2-user@${TEST_SERVER} 'bash' < ./adminScripts/updateAndRestart-test.sh
# ssh ec2-aws 'bash' < ./adminScripts/updateAndRestart.sh
