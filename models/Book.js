// modals/Book.js
// models/Book.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './User.js'; // Import the User model (assuming Seller is the User model)

// Define the Book model
const Book = sequelize.define("Book", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
  },
  publishedDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

// Define the relationship between Book and User (Seller)
Book.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

export default Book;
