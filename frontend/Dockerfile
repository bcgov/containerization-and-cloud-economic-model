FROM node:lts-alpine3.12

ENV PORT="${PORT:-8080}"

USER root
WORKDIR /app
COPY . .
RUN npm install
EXPOSE "${PORT}"
CMD npm run dev
