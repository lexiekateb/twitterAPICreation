#specifying a base image: Nodejs
FROM node:12.18.1

#set a directory for the app
WORKDIR /app

COPY package*.json

# install dependencies
RUN npm install

# copy all the files to the container
COPY . .

# define the port number the container should expose
EXPOSE 3000

# run the command
CMD ["node", "express.js"]

