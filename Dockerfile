FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

WORKDIR /usr/src/app/realtime-quiz
RUN npm install
RUN npm run build

WORKDIR /usr/src/app

EXPOSE 8080
CMD [ "node", "server.js" ]