FROM node:16 AS builder

WORKDIR /app

COPY . /app/

RUN apt-get update && apt-get install -y python3 make gcc g++ musl-dev xdg-utils

RUN yarn install

EXPOSE 3000

CMD ["yarn", "dev"]