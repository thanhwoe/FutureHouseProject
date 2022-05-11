
# Build React static files
FROM node:14.15.4-alpine as build

WORKDIR /final/frontend
COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./
RUN npm ci --silent
COPY ./frontend/ ./
RUN npm run build

# Copy React static files and start nginx
FROM nginx:stable-alpine
COPY --from=build /final/frontend/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]