FROM node:12

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install 
COPY . .

EXPOSE 3000
USER node
ENV DEBUG=rest-mqtt-bridge:*
CMD ["node","./bin/www"]