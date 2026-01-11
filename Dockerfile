FROM node:20-alpine

# working directory inside the container
WORKDIR /usr/src/app

# copy package files first to leverage Docker's cache layers
# this prevents re-installing modules if the code changes but dependencies don't
COPY package*.json ./

# install dependencies
RUN npm install --production

# copy the rest of the application code
COPY . .


EXPOSE 3002

# define the command to run your app
CMD ["node", "index.js"]