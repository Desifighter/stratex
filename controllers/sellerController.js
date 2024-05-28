import fs from "fs";
import csv from "csv-parser";
import Book from "../models/Book.js";

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

// for View All Books of Users
export const allSellerBooks = async (req, res) => {
  try {
    const userId = req.user._id;
    try {
      const books = await Book.findAll({ where: { UserId: userId } });
      res.json(books);
    } catch (error) {
      console.error("Error retrieving books:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a book by its ID
export const updateBookById = async (req, res) => {
  const bookId = req.params.bookid;
  const { title, author, price, publishedDate } = req.body;

  try {
    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    console.log(book.UserId);
    console.log(req.user._id);
    if(book.UserId != req.user._id){
      return res.status(404).json({ message: "Remember You Never Listed This Book Bro \n \n So You Can Not Upadte It" });
    }

    // Update the book with the provided details
    await book.update({
      title: title || book.title,
      author: author || book.author,
      price: price || book.price,
      publishedDate: publishedDate || book.publishedDate,
    });

    res.json({ message: "Book updated successfully", updatedBook: book });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a book by its ID
export const deleteBookById = async (req, res) => {
  const bookId = req.params.bookid;

  try {
    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    console.log(book);
    console.log(book.UserId);
    console.log(req.user._id);
    if (book.UserId != req.user._id) {
      return res
        .status(404)
        .json({
          message:
            "Remember You Never Listed This Book Bro \n \n So You Can Not Delete It",
        });
    }

    // Delete the book
    await book.destroy();

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
