FROM node:12

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install 
COPY pub.js .

USER node
CMD ["node","pub.js"]