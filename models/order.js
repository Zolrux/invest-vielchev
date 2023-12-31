import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';
import User from './user.js';
import Category from './category.js';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
	type: DataTypes.ENUM('В обробці', 'Відхилено', 'Виконано'),
	allowNull: false,
	defaultValue: 'В обробці'
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

Order.belongsTo(User, { foreignKey: 'user_id' });
Order.belongsTo(Category, { foreignKey: 'category_id' });

export default Order;