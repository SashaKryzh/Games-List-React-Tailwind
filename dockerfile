FROM node:16.17.1
WORKDIR /usr/src/app
RUN npm install -g pnpm

COPY ./package*.json ./
COPY ./pnpm*.yaml ./
# backend
COPY ./backend/package*.json ./backend/
COPY ./backend/tsconfig.json ./backend/
# frontend
COPY ./frontend/package*.json ./frontend/
COPY ./frontend/pnpm*.yaml ./frontend/
# shared
COPY ./packages/models/package*.json ./packages/models/

RUN pnpm install
COPY . .
EXPOSE 3000
EXPOSE 3030
CMD [ "pnpm", "start" ]
