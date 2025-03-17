import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

// Модель User (пользователь)
export const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'users'
});
