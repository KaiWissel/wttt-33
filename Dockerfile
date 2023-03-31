FROM node:18.10.0-alpine3.16

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY . .

RUN npm install

USER node

ENTRYPOINT [ "/bin/sh", "./docker-entrypoint.sh" ]
