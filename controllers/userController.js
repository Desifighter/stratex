import Book from "../models/Book.js";

export const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
   
    console.error("Error retrieving books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get details of a specific book by its ID
export const getDetails = async (req, res) => {
  const bookId = req.params.id; // Extract the book ID from the request parameters

  try {
    // Find the book by its primary key (ID)
    const book = await Book.findByPk(bookId);

    if (!book) {
      // If the book does not exist, return a 404 Not Found response
      return res.status(404).json({ message: "Book not found" });
    }

    // Return the book details
    res.json(book);
  } catch (error) {
    // If an error occurs, log the error and return a 500 Internal Server Error response
    console.error("Error retrieving book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
