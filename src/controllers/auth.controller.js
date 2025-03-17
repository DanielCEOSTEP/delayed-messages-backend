import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

// Регистрация
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Проверка на заполнение
    if (!email || !password) {
      return res.status(400).json({ message: 'Email и пароль обязательны' });
    }

    // Проверка, не занят ли email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    // Хешируем пароль
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Создаём запись в таблице users
    const newUser = await User.create({ email, passwordHash });

    // Генерируем JWT-токен
    const token = jwt.sign(
      { userId: newUser.id },         // payload
      process.env.JWT_SECRET || 'SECRET_KEY',  // секрет
      { expiresIn: '7d' }            // срок действия
    );

    res.status(201).json({
      message: 'Пользователь создан',
      token
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Логин
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ищем пользователя по email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Неверные данные для входа' });
    }

    // Проверяем пароль
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверные данные для входа' });
    }

    // Генерируем JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'SECRET_KEY',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Успешный вход',
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
