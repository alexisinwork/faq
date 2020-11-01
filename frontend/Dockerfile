# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:12
# Set the working directory to /frontend
WORKDIR /frontend
# copy package.json into the container at /frontend
COPY package*.json /frontend/
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /frontend
COPY . /frontend/
# Make port 12000 available to the world outside this container
EXPOSE 12000
# Build and run the app when the container launches
CMD ./entrypoint.sh