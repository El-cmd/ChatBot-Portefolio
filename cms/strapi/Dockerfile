FROM node:22-bookworm-slim

WORKDIR /opt/app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 1337

CMD ["npm", "run", "develop"]
