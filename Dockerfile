FROM node:10-alpine
# VOLUME ["/usr/src/app"]
WORKDIR /usr/src/app
RUN apk add git build-base python
COPY package.json .
COPY yarn.lock .
RUN yarn install --prod --frozen-lockfile --link-duplicates --non-interactive
COPY . .
RUN yarn build
CMD ["yarn", "buidler", "console"]
