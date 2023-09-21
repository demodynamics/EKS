FROM node:alpine
WORKDIR /app
EXPOSE 8080
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "webserver.js" ]