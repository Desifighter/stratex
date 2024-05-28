// modals/Book.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Seller from "./Seller.js";

const Book = sequelize.define("Book", {
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
  quantity: {
    type: DataTypes.INTEGER,
  },
});

Book.belongsTo(Seller); // Define the relationship between Book and Seller

export default Book;
