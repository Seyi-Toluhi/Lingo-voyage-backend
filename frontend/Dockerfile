# Use a Node.js base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the frontend application
RUN npm run build

# Serve the built app using a simple HTTP server
RUN npm install -g serve

# Command to run the app
CMD ["serve", "-s", "dist", "-l", "5000"]
