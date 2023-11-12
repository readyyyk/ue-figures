FROM node:latest
LABEL authors="halone"
RUN mkdir /app
WORKDIR /app
ADD . /app
RUN npm i
EXPOSE 5173
ENTRYPOINT ["npm", "run", "dev"]