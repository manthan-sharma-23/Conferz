FROM node:21.5.0-alpine3.19

WORKDIR /usr/src/app/server

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

ARG DATABASE_URL
ARG SECRET_KEY
ARG DATABASE_URL

ENV DATABASE_URL ${DATABASE_URL}
ENV SECRET_KEY ${SECRET_KEY}
ENV REDIS_SERVER_PORT ${REDIS_SERVER_PORT}

EXPOSE 3200

RUN npm run db:migrate

CMD [ "npm","run","dev" ]
