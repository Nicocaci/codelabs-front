# 1) Build de Vite
FROM node:22-alpine AS build
WORKDIR /app

# Railway pasa las variables del servicio como build args: hay que declararlas
ARG VITE_API_URL
ARG VITE_CAL_LINK
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_CAL_LINK=$VITE_CAL_LINK

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2) Servir los archivos estáticos con Caddy
FROM caddy:2-alpine
WORKDIR /app
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /app/dist
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
