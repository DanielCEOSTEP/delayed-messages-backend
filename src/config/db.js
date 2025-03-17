import { Sequelize } from 'sequelize';

// Мы берём адрес БД из переменной окружения. Railway сам задаст DATABASE_URL
const connectionString = process.env.DATABASE_URL;

// Создаём экземпляр Sequelize
export const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  dialectOptions: {
    // Railway почти всегда требует SSL
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  // Отключим лишние логи SQL, чтобы логи были чище
  logging: false
});

// Функция для подключения и синхронизации
export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL via Sequelize');
    // Если хочешь, чтобы Sequelize сам создавал таблицы (MVP-режим):
    await sequelize.sync({ alter: false });
    console.log('All models were synchronized successfully');
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
}
