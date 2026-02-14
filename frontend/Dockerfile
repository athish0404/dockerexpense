# -------- Build Stage --------
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Fix permission issue for vite
RUN chmod -R 755 node_modules/.bin

RUN npm run build

# -------- Production Stage --------
FROM nginx:alpine

COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
