## build stage ##
FROM node:14-alpine as build-stage

# Define a working directory
WORKDIR /build

# Copy the required files to the WORKDIR
COPY package*.json ./
COPY vite.config.ts ./

# Include an .env file with placeholder variables to allow for run time variable replacement
COPY .env.docker ./.env

# Install the required dependencies
RUN npm install

# Copy source files to container
COPY . .

# Build the web app
RUN npm run build

## production stage ##
FROM nginx:stable-alpine as production
LABEL maintainer="Dylan Gore <hello@dylangore.ie>"

# Copy the build output to the default Nginx directory
COPY --from=build-stage /build/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy and run the script to replace environment variables at run time
COPY entrypoint.sh /usr/share/nginx/
RUN chmod +x /usr/share/nginx/entrypoint.sh

ENTRYPOINT ["/usr/share/nginx/entrypoint.sh"]

# Expose port 80
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]