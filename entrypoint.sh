#!/bin/sh

# Replace the placeholder variables with the values of the corresponding environment variables
sed -i -e "s|VITE_FIREBASE_API_KEY|$VITE_FIREBASE_API_KEY|g" /usr/share/nginx/html/assets/*.js
sed -i -e "s|VITE_AUTH_DOMAIN|$VITE_AUTH_DOMAIN|g" /usr/share/nginx/html/assets/*.js
sed -i -e "s|VITE_DATABASE_URL|$VITE_DATABASE_URL|g" /usr/share/nginx/html/assets/*.js
sed -i -e "s|VITE_PROJECT_ID|$VITE_PROJECT_ID|g" /usr/share/nginx/html/assets/*.js
sed -i -e "s|VITE_STORAGE_BUCKET|$VITE_STORAGE_BUCKET|g" /usr/share/nginx/html/assets/*.js
sed -i -e "s|VITE_MESSAGING_SENDER_ID|$VITE_MESSAGING_SENDER_ID|g" /usr/share/nginx/html/assets/*.js
sed -i -e "s|VITE_APP_ID|$VITE_APP_ID|g" /usr/share/nginx/html/assets/*.js
sed -i -e "s|VITE_ENABLE_USER_REGISTRATION|$VITE_ENABLE_USER_REGISTRATION|g" /usr/share/nginx/html/assets/*.js
sed -i -e "s|VITE_API_LOCATION|$VITE_API_LOCATION|g" /usr/share/nginx/html/assets/*.js
sed -i -e "s|VITE_LOGIN_PROVIDERS|$VITE_LOGIN_PROVIDERS|g" /usr/share/nginx/html/assets/*.js

exec "$@"