FROM node:lts-alpine AS BUILDER
WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM node:lts-alpine AS PRODUCTION
WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=BUILDER  /app/dist ./

CMD node main.js