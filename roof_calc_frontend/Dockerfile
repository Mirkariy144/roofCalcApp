FROM node:alpine
WORKDIR /usr/app/front
COPY ./ ./
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]