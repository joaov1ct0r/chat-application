# Stage 1 Development
FROM node as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

ADD . /usr/src/app

RUN npm run build

# Stage 2 Production
FROM node as production

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/src/scripts ./src/scripts

COPY --from=development /usr/src/app/package*.json ./

COPY --from=development /usr/src/app/build ./build

COPY --from=development /usr/src/app/src/scripts ./src/scripts

RUN npm install --omit=dev
