import express from 'express';
import { connectDB } from './config/db.js';

// Подключим модель User:
import { User } from './models/user.model.js';

const app = express();

await connectDB(); // Подключаемся к БД и синхронизируем модели

app.get('/', (req, res) => {
  res.send('Hello from Express + PostgreSQL + Sequelize!');
});

// Тестовый маршрут для проверки работы с БД
app.get('/test-user', async (req, res) => {
  try {
    // 1. Создадим запись в таблице users
    const newUser = await User.create({
      email: `test${Date.now()}@example.com`,
      passwordHash: 'hashed_password'
    });

    // 2. Получим всех пользователей
    const allUsers = await User.findAll();

    res.json({
      message: 'User created and fetched successfully',
      createdUser: newUser,
      allUsers
    });
  } catch (error) {
    console.error('Error in /test-user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
