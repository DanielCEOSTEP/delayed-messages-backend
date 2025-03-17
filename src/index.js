import express from 'express';
import { connectDB } from './config/db.js';
import { User } from './models/user.model.js';
import authRoutes from './routes/auth.js';

const app = express();

// Подключаемся к БД
await connectDB();

// Позволяем Express парсить JSON-тело запросов
app.use(express.json());

// Тестовый маршрут
app.get('/', (req, res) => {
  res.send('Hello from Express + PostgreSQL + Sequelize!');
});

// Подключаем наши маршруты /auth
app.use('/auth', authRoutes);

// Пример "test-user" - пока можем убрать, если не нужно
app.get('/test-user', async (req, res) => {
  // ... (если хочешь оставить)
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
