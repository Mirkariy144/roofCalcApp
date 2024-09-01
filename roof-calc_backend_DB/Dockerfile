# Используем официальный образ Node.js
FROM node:alpine

# Устанавливаем рабочий каталог
WORKDIR /app

# Копируем зависимости
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем приложение
COPY . .

# Открываем порт
EXPOSE 3001

# Запускаем приложение
CMD ["node", "app.js"]
