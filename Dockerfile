FROM node:18

# Create app directory
WORKDIR /home/app

COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

EXPOSE 3005

CMD [ "node", "dist/main.js" ]