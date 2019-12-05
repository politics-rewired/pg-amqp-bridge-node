# Use latest LTS
FROM node:10.16.0-alpine
WORKDIR /usr/numbers
COPY package.json .
RUN yarn install
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "node", "./dist/index.js" ]
