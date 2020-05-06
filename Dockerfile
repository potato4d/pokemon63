# Use the official Node.js 10 image.
# https://hub.docker.com/_/node
FROM node:12.16.3-alpine3.10

ENV NODE_ENV production
ENV PORT 8080
ENV HOST 0.0.0.0

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./
COPY yarn.lock ./

# Install production dependencies.
RUN yarn install --production

# Copy local code to the container image.
COPY . .

# Service must listen to $PORT environment variable.
# This default value facilitates local development.
# ENV HOST '0.0.0.0'
# ENV PORT 8080

# Run the web service on container startup.
CMD [ "npm", "start" ]
