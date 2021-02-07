FROM node:12
WORKDIR /usr/src/app
COPY ./drcalculendar/package*.json ./
RUN npm install
RUN npm install -D nodemon
COPY ./drcalculendar .
EXPOSE 8080
CMD [ "node", "server.js" ]