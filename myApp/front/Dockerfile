FROM node:18.18.2
WORKDIR /app
EXPOSE 3000
COPY package*.json ./
RUN npm install
COPY . ./
CMD [ "npm", "run", "build" ]