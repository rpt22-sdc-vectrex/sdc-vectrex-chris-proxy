FROM mhart/alpine-node:latest

RUN apk --no-cache update \
  && apk --no-cache add curl bash
  
WORKDIR /code

ENV PORT 80

COPY package.json /code/package.json

RUN npm install

RUN npm prune --production

RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin \
  && /usr/local/bin/node-prune

COPY . /code

CMD ["node", "server.js"]