FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npx nx build shell --configuration=production

FROM nginx:1.25-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/apps/shell /usr/share/nginx/html

COPY apps/shell/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
