## build stage ##
FROM node:15-alpine as build-stage

# Define a working directory
WORKDIR /build

# Copy the required files to the WORKDIR
COPY package*.json ./
COPY vite.config.ts ./

# Install the required dependencies
RUN npm install

# Copy source files to container
COPY . .

# Build the web app
RUN npm run build

## production stage ##
FROM nginx:stable-alpine as production

# Copy the build output to the default Nginx directory
COPY --from=build-stage /build/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]