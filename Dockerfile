FROM node:8
WORKDIR /edsegura/app
COPY package*.json ./
RUN npm install
ADD . /edsegura/app/
EXPOSE 3000
EXPOSE 27017
