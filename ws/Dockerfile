# Stage 1 Development
FROM node as development

WORKDIR /usr/src/app

COPY package*.json ./

ADD . /usr/src/app

RUN npm run build

# Stage 2 Production
FROM node as production

WORKDIR /usr/src/app

COPY --from=development package*.json ./

COPY --from=development /usr/src/app/src/scripts ./src/scripts

COPY --from=development /usr/src/app/build ./build

RUN npm i --omit=dev
