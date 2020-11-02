# Use a lighter version of Node as a parent image
FROM node:14.15.0-alpine3.10
ENV PATH /backend/node_modules/.bin:$PATH
# Set the working directory to /client
WORKDIR /backend
# copy package.json into the container at /client
COPY package*.json ./
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /client
COPY src ./src
# Make port 3000 available to the world outside this container
EXPOSE 3000
# Run the app when the container launches
CMD ["npm", "start"]