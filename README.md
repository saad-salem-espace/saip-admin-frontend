# SAIP

- [SAIP](#project-title)
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

IP Search System for the Saudi Authority for Intellectual Property (SAIP).

The main objective is to establish an advanced search platform, to display intellectual property data and information in real-time, and easily download it in different formats while ensuring a user interface that is easy for all categories of users (including examiners and property agents. Intellectuals, inventors, and innovators).

---

## Team

| Name             | Role                      |
| ---------------- | ------------------------- |
| Nada Dahab       | Software Developer        |
| Sameh Mohamed    | Software Developer        |
| John Eskandar    | Software Developer        |
| Basma Zeyada     | Frontend Developer        |
| Yasmeen Makhlouf | Software Quality Engineer |
| Nesma AwadAllah  | Product Owner             |
| Tamer Kamal      | Scrum Master              |

---

## Technology

- React 16.14.0
- Yarn 1.22.17

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
  - Use npm to install yarn
    ```shell
    npm install -g yarn@1.22.17
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
- Start application
  ```shell
  yarn start
  ```

## Test Users

Include if any test users are needed to login locally to the system

## Figma Design

1. [links for figma design](https://www.figma.com/file/ujOmAreJCfCepXfbV1Kpr0/SAIP-IP-Search-project?node-id=26%3A3169&t=xH5qU16OJXQIPGfB-1)
2. [links for figma design](https://www.figma.com/file/DzFUZCMmX9twhgWmMMHUaN/SAIP-wireframes?node-id=284%3A17167&t=Zag2hFkK3Bqjkzwb-1)

## Links

[TODO]
Development: [Link](saip.gov.sa)

Testing: [Link](saip.gov.sa)

Staging: [Link](saip.gov.sa)

Production: [Link](saip.gov.sa)
