FROM node:alpine as backBuilder

COPY package.json package.json
RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "app.js"]
