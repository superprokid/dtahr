# Install image node 16
FROM node:16

RUN node -v
RUN npm -v

WORKDIR /apps
COPY . .
RUN rm -rf node_modules package-lock.jon
RUN npm i

CMD ["node", "index.js"]
