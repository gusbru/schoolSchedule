# Use the official image as a parent image
FROM node:latest

# # Set the working directory
WORKDIR /mnt/frontend

# Copy the file from your host to your current location
COPY package.json .
COPY package-lock.json ./

# Run the command inside your image filesystem
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
# RUN npm install --save --save-dev
# RUN npm install react-scripts -g

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 3000

# Run the specified command within the container.
CMD [ "npm", "start" ]

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .


###
# docker build -t gusbru/node-frontend .
# docker run --name frontend --rm --network my-net -it gusbru/node-frontend