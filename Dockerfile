FROM node:18

# RUN adduser fiap

# USER fiap

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]