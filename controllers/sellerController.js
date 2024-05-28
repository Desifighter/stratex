import fs from "fs";
import csv from "csv-parser";
import Book from "../models/Book.js";
import User from "../models/User.js";
import { where } from "sequelize";

export const addBooksFromCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const results = [];
    const errors = [];

    const userId = req.user._id;

    // Parse CSV file
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", async () => {
        // console.log(results);
        const addedBooks = [];
        for (const book of results) {
          const { title, author, publishedDate, price } = book;
          if (!title) {
            errors.push({ book, error: "Name is not available" });
            continue;
          }
          if (!author) {
            errors.push({ book, error: "Author is not available" });
            continue;
          }
          if (!publishedDate) {
            errors.push({ book, error: "Published Date is not available" });
            continue;
          }
          if (!price) {
            errors.push({ book, error: "Price is not available" });
            continue;
          }

          try {
            const newBook = await Book.create({
              title,
              author,
              price,
              publishedDate,
              UserId: userId,
            });
            addedBooks.push(newBook);
          } catch (err) {
            errors.push({ book, error: err.message });
          }
        }

        fs.unlinkSync(req.file.path); // Delete file after processing

        res.json({
          success: true,
          addedBooksCount: addedBooks.length,
          errors,
        });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const allSellerBooks = async (req, res) => {
  try {
    const userId = req.user._id;
    try {
      const books = await Book.findAll({where:{UserId:userId}});
      res.json(books);
    } catch (error) {
      console.error("Error retrieving books:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {}
};

// async function findBooksByUserId(userId) {
//   try {
//     // Find the user by ID
//     const user = await User.findByPk(userId);

//     if (!user) {
//       // Handle case where user does not exist
//       return [];
//     }

//     // Use the association to find all books belonging to the user
//     const books = await user.getBooks();

//     return books;
//   } catch (error) {
//     // Handle any errors
//     console.error('Error finding books by user ID:', error);
//     throw new Error('Error finding books by user ID');
//   }
// }