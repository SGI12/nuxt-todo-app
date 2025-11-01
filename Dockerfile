# Multi-stage build для оптимизации размера образа

# Стадия 1: Установка зависимостей
FROM node:20-alpine AS dependencies

WORKDIR /app

# Копируем файлы с зависимостями
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm ci --only=production --ignore-scripts && \
    npm cache clean --force

# Стадия 2: Сборка приложения
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем package.json
COPY package.json package-lock.json ./

# Устанавливаем все зависимости (включая dev)
RUN npm ci --ignore-scripts

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Стадия 3: Production образ
FROM node:20-alpine AS runner

WORKDIR /app

# Добавляем пользователя для безопасности
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nuxtjs

# Копируем package.json для runtime
COPY --from=builder /app/package.json ./

# Копируем собранное приложение
COPY --from=builder --chown=nuxtjs:nodejs /app/.output ./.output
COPY --from=builder --chown=nuxtjs:nodejs /app/.nuxt ./.nuxt

# Устанавливаем NODE_ENV
ENV NODE_ENV=production

# Переключаемся на непривилегированного пользователя
USER nuxtjs

# Открываем порт
EXPOSE 3000

# Устанавливаем переменные окружения
ENV HOST=0.0.0.0
ENV PORT=3000

# Запускаем приложение
CMD ["node", ".output/server/index.mjs"]
