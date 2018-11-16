FROM node:8.12.0-alpine
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
WORKDIR /chancify
COPY package.json ./
RUN npm install --only=production
COPY app ./app/
COPY config ./config/
COPY index.js ./index.js
USER node
EXPOSE 7000
CMD ["npm", "start"]