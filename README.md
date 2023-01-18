
# [Project Title]

- [[Project Title]](#project-title)
  - [Description](#description)
  - [Team](#team)
  - [Technology](#technology)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
  - [Test Users](#test-users)
  - [Figma Design](#figma-design)
  - [Links](#links)

---
## Description
[Brief Description of the project]

---
## Team


| Name      | Role               |
| --------- | ------------------ |
| Memeber 1 | Product Owner      |
| Member 2  | Frontend Developer |

---
## Technology
[Include technology used in this project]

---
# Getting Started

## Prerequisites
### Docker setup (for docker users) 
- You should have [Docker](https://docs.docker.com/engine/install/ubuntu/) installed on your host OS.
- Apply [post installation steps](https://docs.docker.com/engine/install/linux-postinstall/) to use docker without `sudo`.

### Local setup (for non docker users)
- Install nodejs
  - Download PPA in order to get access to its packages
    ```shell
    cd ~
    curl -sL https://deb.nodesource.com/setup_18.x -o /tmp/nodesource_setup.sh
    ```
  - Run setup script
    ```shell
    sudo bash /tmp/nodesource_setup.sh
    ```
  - Install nodejs
    ```shell
    sudo apt install nodejs
    ```
  - Check nodejs installed
    ```shell
    node -v
    ```
  - Install yarn
    ```shell
    npm install -g yarn
    ```
  - Check yarn installed
    ```shell
    yarn --version
    ```
  

## Installing
### For docker users
- Copy .env.example to .env
  ```shell
  cp .env.example .env
  ```
- Replace APP_USER_ID with you current user id
  ```shell
  sed  -i "/APP_USER_ID=/c\APP_USER_ID=$(id -u)" .env
  ```
- Create `node_modules` in the project directory
  ```shell
  mkdir node_modules
  ```
- Start docker compose
  ```shell
  docker compose up
  ```

### For Local users
- Copy .env.example to .env
  ```shell
  cp .env.example .env
  ```
- Run yarn install
  ```shell
  yarn install
  ```

## Test Users

Include if any test users are needed to login locally to the system

| User      | Pass               |
| --------- | ------------------ |
| Memeber 1 | Product Owner      |
| Member 2  | Frontend Developer |

## Figma Design

[link for figma design](saip.gov.sa)


## Links
Development: [Link](saip.gov.sa)

Testing: [Link](saip.gov.sa)

Staging: [Link](saip.gov.sa)

Production: [Link](saip.gov.sa)

