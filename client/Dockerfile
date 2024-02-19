# Use the official Node.js image as the base image
FROM node:21.5.0-alpine3.19

# Set the working directory inside the container
WORKDIR /usr/src/app/client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to start the application
CMD [ "npm", "run","dev" ]
