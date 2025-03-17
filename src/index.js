import express from 'express';
import { connectDB } from './config/db.js';

const app = express();

// Простейший маршрут для проверки
app.get('/', (req, res) => {
  res.send('Hello from Express with PostgreSQL on Railway!');
});

const PORT = process.env.PORT || 3000;

// Подключаемся к БД, потом запускаем сервер
await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
