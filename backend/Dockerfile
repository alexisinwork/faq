# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:12
# Set the working directory to /client
WORKDIR /backend
# copy package.json into the container at /client
COPY package*.json /backend/
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /client
COPY . /backend/
# Make port 12000 available to the world outside this container
EXPOSE 3000
# Run the app when the container launches
CMD ["npm", "start"]