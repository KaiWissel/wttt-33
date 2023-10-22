FROM node:18.18.2-alpine3.18

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY . .

RUN npm install 
RUN npm run astro telemetry disable
RUN npx prisma generate

USER node

ENTRYPOINT [ "/bin/sh", "./docker-entrypoint.sh" ]
