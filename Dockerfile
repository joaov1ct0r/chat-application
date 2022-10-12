# Stage 1 Development
FROM node:16.17.1 as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

ADD . /usr/src/app

RUN npm run build

# Stage 2 Production
FROM node:16.17.1-alpine3.16 as production

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/src/scripts ./src/scripts

COPY --from=development /usr/src/app/package*.json ./

COPY --from=development /usr/src/app/build ./build

RUN npm i --omit=dev
