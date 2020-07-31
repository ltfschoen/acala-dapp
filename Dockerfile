# Use latest Node.js LTS from Docker Hub
FROM node:12

WORKDIR /app

# Fetch and configure Yarn path
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
ENV PATH=/root/.yarn/bin:$PATH
# Ignore inconsistent duplicate dependency versions
ENV SKIP_PREFLIGHT_CHECK=true

# Copy only package configuration to leverage cached Docker layers
COPY package.json yarn.lock ./
# Install dependencies
RUN yarn install && \
  # Add missing dependency
  yarn add customize-cra -W

# Bundle source code inside the Docker image
COPY . .

# Update and install necessary dependencies to server create-react-app on Linux
RUN apt-get update && \
  apt-get install -y apt-file && \
  apt-file update && \
  apt-get install -y libusb-1.0 && \
  # Recursively install dependencies of package.json files in nested directories
  node ./scripts/recursiveInstall.js --skip-root

# Prevent Docker container from stopping after running it
# ENTRYPOINT ["tail", "-f", "/dev/null"]
# Run script in package.json
CMD ["yarn", "run", "start:dapp"]
