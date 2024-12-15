FROM node:22-alpine as build

WORKDIR /app

COPY package.json package-lock.json angular.json ./

RUN npm install -g @angular/cli && \
    npm install

COPY src/ ./src/
COPY eslint.config.js tsconfig.app.json tsconfig.json tsconfig.spec.json ./

RUN npm run build

FROM nginx:1.27.3-alpine-slim

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/angular-webapp-template/browser /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
