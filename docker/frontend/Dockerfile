
# Build React static files
FROM node:14.15.4-alpine as build

WORKDIR /final/frontend
COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./
RUN npm ci --silent
COPY ./frontend/ ./
RUN npm run build
