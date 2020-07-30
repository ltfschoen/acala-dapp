# docker build --tag acala:tc4 .
# docker images
# docker stop acala-tc4
# docker rm acala-tc4
# docker run -p 3000:3000 -d --name acala-tc4 acala:tc4
# docker ps -a
# docker logs acala-tc4
# docker exec -it acala-tc4 /bin/bash

FROM node:12

WORKDIR /app

RUN curl -o- -L https://yarnpkg.com/install.sh | bash
ENV PATH=/root/.yarn/bin:$PATH
ENV SKIP_PREFLIGHT_CHECK=true

COPY package.json .
RUN yarn install && \
  yarn add customize-cra -W && \
  npm i -g recursive-install && \
  npm-recursive-install --skip-root

COPY . .

RUN apt-get update && \
  apt-get install -y apt-file && \
  apt-file update && \
  apt-get install -y libusb-1.0


# ENTRYPOINT ["tail", "-f", "/dev/null"]
CMD ["yarn", "run", "start:dapp"]
