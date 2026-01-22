# Стадия 1: сборка
FROM node:20-alpine AS build

WORKDIR /app

# Сначала копируем только зависимости → лучше кэширование
COPY package*.json ./

RUN npm ci   # ← лучше чем npm install (точнее и быстрее)

# Копируем остальной код
COPY . .

# Собираем (должно создать ./out)
RUN npm run build

# Стадия 2: финальный образ
FROM nginx:alpine

# Копируем статические файлы из стадии сборки
COPY --from=build /app/out /usr/share/nginx/html

# Конфиг nginx (очень важно!)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Порт (80 — стандарт для nginx)
EXPOSE 80

# Запуск
CMD ["nginx", "-g", "daemon off;"]