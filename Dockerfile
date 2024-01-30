FROM node:20-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY . .

RUN npm install

USER node

ENTRYPOINT [ "/bin/sh", "./docker-entrypoint.sh" ]
