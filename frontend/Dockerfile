# frontend/Dockerfile

# Development Dockerfile for hot reloading
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code (this will be overridden by volume mount)
COPY . .

# Expose the Angular dev server port
EXPOSE 4200

# Start the Angular development server with hot reloading
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--port", "4200", "--poll", "2000"]
