# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar todas as dependências (incluindo devDependencies para build)
# --legacy-peer-deps resolve problemas de peer dependencies
# --ignore-optional ignora falhas em dependências opcionais (como bufferutil)
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# Copiar todo o código fonte
COPY . .

# Build do frontend (Vite) e backend (esbuild)
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Copiar apenas package files
COPY package*.json ./

# Instalar apenas dependências de produção
# --legacy-peer-deps resolve problemas de peer dependencies
# --ignore-optional ignora falhas em dependências opcionais
RUN npm ci --only=production --legacy-peer-deps || npm install --only=production --legacy-peer-deps && npm cache clean --force

# Copiar arquivos buildados do stage anterior
COPY --from=builder /app/dist ./dist

# Expor porta padrão (pode ser sobrescrita via PORT env var)
EXPOSE 5000

# Variáveis de ambiente
ENV NODE_ENV=production

# Comando para iniciar o servidor
CMD ["npm", "start"]

