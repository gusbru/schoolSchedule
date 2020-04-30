# Use the official image as a parent image
FROM node:latest

# Set the working directory
WORKDIR /mnt/backend

# Copy the file from your host to your current location
COPY package.json .

# dependencies
RUN apt-get update
RUN apt-get install -y git musl-dev
RUN ln -s /usr/lib/x86_64-linux-musl/libc.so /lib/libc.musl-x86_64.so.1

# Run the command inside your image filesystem
# RUN npm install -g nodemon @babel/core @babel-node @babel/preset-env
# RUN npm install --save-dev --save
RUN npm install --quiet

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 3030

# Run the specified command within the container.
CMD [ "npm", "run", "dev" ]

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .


###
# docker build -t gusbru/node-backend .
# docker run --name backend --rm --network my-net -it gusbru/node-backend
