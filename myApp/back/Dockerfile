FROM node:alpine
WORKDIR /app
EXPOSE 5003
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD [ "npm", "run", "start:prod" ]