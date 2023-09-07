FROM node:16

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV NODE_SERVER_PORT 5000

EXPOSE $NODE_SERVER_PORT 

CMD [ "npm","start" ]