# Use latest Node.js LTS from Docker Hub
FROM node:12

# Fetch Yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
# Configure non-root user 'app'
RUN useradd --user-group --create-home --shell /bin/false app

# Configure Yarn path
ENV PATH=/root/.yarn/bin:$PATH
# Configure user path
ENV HOME=/home/app

# Copy only package configuration to leverage cached Docker layers
# Wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json yarn.lock $HOME/
# Change ownership recursively to belong to the user
RUN chown -R app $HOME/*

# Set the non-root user
USER app
# Create directory to hold application code inside the Docker image
WORKDIR $HOME
# Install dependencies
RUN yarn

# Set root user
USER root
# Bundle source code inside the Docker image
COPY . $HOME
RUN chown -R app $HOME/*

# Map port 3000 using Docker daemon since that's what the app binds to
EXPOSE 3000

USER app
# CMD ["yarn", "start:dapp"]
