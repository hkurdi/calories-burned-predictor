# Use the official Node.js image as a parent image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Install serve to serve the application
RUN npm install -g serve

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Serve the application
CMD ["serve", "-s", "dist"]
