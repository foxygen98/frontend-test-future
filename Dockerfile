from node:11-alpine as build-stage
WORKDIR /app
COPY . ./
RUN npm i
RUN npm run build

from nginx:1.15-alpine
COPY --from=build-stage /app/build /usr/share/nginx/html/frontend-test-future/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]