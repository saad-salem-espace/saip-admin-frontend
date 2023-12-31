# Fetch most stable node image
FROM node:18.13-alpine

ARG APP_USER_ID
ARG PROJECT_DIRECTORY

ENV APP_USER             saip
ENV DEBIAN_FRONTEND      noninteractive
ENV USER_HOME_DIRECTORY  /home/${APP_USER}
ENV APP_PATH             ${PROJECT_DIRECTORY}
ENV NODE_MODULES_DIR     ${APP_PATH}/node_modules
ENV DOT_NPM              ${USER_HOME_DIRECTORY}/.npm
ENV YARN_VERSION         1.22.17

# Upgrade packages.
RUN apk --no-cache --available upgrade

# Install system dependencies required both at runtime and build time.
RUN apk add --no-cache build-base \
  git curl bash vim \
  bash-completion openssh yarn

RUN yarn policies set-version ${YARN_VERSION}

RUN deluser --remove-home node

RUN adduser -s /bin/bash -u ${APP_USER_ID} -h ${USER_HOME_DIRECTORY} -D ${APP_USER} && \
  mkdir -p ${APP_PATH} ${NODE_MODULES_DIR} ${DOT_NPM} && \
  chown -R ${APP_USER}:${APP_USER} ${APP_PATH} ${NODE_MODULES_DIR} ${DOT_NPM}

WORKDIR ${USER_HOME_DIRECTORY}

COPY docker/docker-entrypoint.sh ${USER_HOME_DIRECTORY}/docker-entrypoint.sh
RUN chmod +x ${USER_HOME_DIRECTORY}/docker-entrypoint.sh

USER ${APP_USER}

WORKDIR ${APP_PATH}

COPY --chown=${APP_USER} . .
COPY --chown=${APP_USER} package.json .