# ---------- STAGE 1: build ----------
FROM node:18-alpine AS builder
WORKDIR /app

# Habilita o pnpm via Corepack
RUN corepack enable

ARG VITE_API_URL

# Copia só o manifest e o lock
COPY package.json pnpm-lock.yaml ./

# Instala todas as deps (dev+prod) respeitando o lockfile
RUN pnpm install --frozen-lockfile

# Copia todo o código e gera a build estática
COPY . .

ENV VITE_API_URL=$VITE_API_URL

RUN pnpm run build

RUN echo "Build completed with VITE_API_URL=$VITE_API_URL"

# ---------- STAGE 2: runtime ----------
FROM nginx:stable-alpine AS runner
# Limpa o conteúdo padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia o build do estágio anterior
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
