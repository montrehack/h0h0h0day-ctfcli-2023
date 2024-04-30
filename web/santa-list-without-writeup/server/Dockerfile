FROM node:alpine

COPY . /server
WORKDIR /server

RUN npm install
RUN npm run build

RUN npm install -g nodemon

EXPOSE 9090
ENTRYPOINT ["nodemon", "/server/build/index.js"]
