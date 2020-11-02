# Use a lighter version of Node as a parent image
FROM node:14.15.0-alpine3.10
# Set the working directory to /frontend
WORKDIR /frontend
# copy package.json into the container at /frontend
COPY package*.json ./
# install dependencies
RUN npm install
# Copy the sources into the container at /frontend
COPY components ./components 
COPY pages ./pages
COPY public ./public
COPY utils ./utils
COPY .babelrc next.config.js config.js ./
# Make port 12000 available to the world outside this container
EXPOSE 12000
# Build and run the app when the container launches
CMD npm run build ; npm start