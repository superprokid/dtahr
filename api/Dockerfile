# Install image node 16
FROM node:16

RUN node -v
RUN npm -v

ENV TZ=Asia/Ho_Chi_Minh

WORKDIR /app
COPY . .
RUN rm -rf node_modules package-lock.jon
RUN npm i
RUN npm i bcrypt
RUN npm i -g nodemon

CMD ["nodemon", "index.js"]
