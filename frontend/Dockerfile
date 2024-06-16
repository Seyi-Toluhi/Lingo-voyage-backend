# Node.js base image
FROM node:14

# Setting the working directory
WORKDIR /app

# Copying package.json and package-lock.json
COPY package*.json ./

# Installing dependencies
RUN npm install

# Copying the rest of the application code
COPY . .

# Building the frontend application
RUN npm run build

# Serving the built app using a simple HTTP server
RUN npm install -g serve

# Command to run the app
CMD ["serve", "-s", "dist", "-l", "5000"]
