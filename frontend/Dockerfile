FROM node:lts-alpine3.12

EXPOSE "${PORT:-8080}"

WORKDIR /app
COPY . .
VOLUME node_modules
RUN npm install

RUN adduser -S nonroot
USER nonroot
CMD npm run dev
