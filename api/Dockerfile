FROM node:18-alpine AS builder
WORKDIR /app

# 1) Habilita o pnpm (via Corepack)
RUN corepack enable

# 2) Copia só manifest + lock
COPY package.json pnpm-lock.yaml ./

# 3) Instala todas as deps (dev+prod)
RUN pnpm install --frozen-lockfile

# 4) Copia o schema do Prisma e gera o client
COPY prisma ./prisma
RUN pnpm prisma generate

# 5) Copia o restante do código e builda
COPY . .
RUN pnpm run build

FROM node:18-alpine AS runner
WORKDIR /app

RUN corepack enable

# Copia manifest + lock
COPY package.json pnpm-lock.yaml ./

# Instala dependências de produção E o Prisma CLI
RUN pnpm install --prod --frozen-lockfile && \
    pnpm add prisma

# Copia o schema do Prisma para poder executar migrations
COPY prisma ./prisma

# Gera o Prisma client no estágio runtime
RUN pnpm prisma generate

# Copia o build final
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["pnpm", "run", "start:prod"]