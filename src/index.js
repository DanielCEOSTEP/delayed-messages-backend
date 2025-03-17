import express from 'express';

const app = express();

// Простейший эндпоинт: GET /
app.get('/', (req, res) => {
  res.send('Hello from Express on Railway!');
});

// Получаем порт из переменной окружения или по умолчанию 3000
const PORT = process.env.PORT || 3000;

// Запускаем сервер
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
