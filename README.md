![license](https://img.shields.io/badge/License-Apache%202.0-blue?logo=apache&style=flat-square)

# Acala-Dapp

acala web app with honzon, homa, dex features.  

# Overview

+ [apps](https://github.com/AcalaNetwork/acala-dapp/tree/master/packages/apps): the endpoint of the dapp
+ [page-deposit](https://github.com/AcalaNetwork/acala-dapp/tree/master/packages/page-deposit): the page for depositing and withdrawing currencies in swap pool
+ [page-governance](https://github.com/AcalaNetwork/acala-dapp/tree/master/packages/page-governance): the page for governance
+ [page-homa](https://github.com/AcalaNetwork/acala-dapp/tree/master/packages/page-homa): the page for homa protocol
+ [page-loan](https://github.com/AcalaNetwork/acala-dapp/tree/master/packages/page-loan): the page for honzon protocol
+ [page-swap](https://github.com/AcalaNetwork/acala-dapp/tree/master/packages/page-swap): the page for swap currencies
+ [page-wallet](https://github.com/AcalaNetwork/acala-dapp/tree/master/packages/page-wallet): the page for an basic wallet

# Development

1. Clone this repo
   ```base
   git clone git@github.com:AcalaNetwork/acala-dapp.git && cd acala-dapp
   ```

2. Install dependencies by `yarn`
   ```base
   yarn install
   ```

3. Launch the UI
   ```base
   yarn run start
   ```

## Docker

1. Install and run Docker

2. Build Docker image and Docker container

```bash
docker build --tag acala:tc4 .
docker run -p 3000:3000 -d --name acala-tc4 acala:tc4
```

3. Inspect whether the Docker container has compiled and served acala-dapp until it says `Compiled successfully!`

```bash
docker logs acala-tc4
```

4. Interact with acala-dapp in a web browser at http://localhost:3000

### Troubleshooting:

* View the Docker images: `docker images`
* View the Docker containers: `docker ps -a`
* Enter the Shell of the Docker container: `docker exec -it acala-tc4 /bin/bash`
* Stop and remove the Docker container: `docker stop acala-tc4 && docker rm acala-tc4`
