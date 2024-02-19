FROM node:21.5.0-alpine3.19

WORKDIR /usr/src/app/client

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "run","dev" ]
