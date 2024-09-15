FROM node:alpine as frontbuilder

COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine

# COPY --from=frontbuilder /dist /usr/share/nginx/html
COPY --from=frontbuilder /nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]