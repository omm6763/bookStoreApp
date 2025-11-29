import Book from "../model/book.model.js";

// Get all books with Search & Filter
export const getBook = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== "All") {
      query.category = category;
    }

    if (search) {
      query.name = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    const book = await Book.find(query);
    res.status(200).json(book);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};

// Get single book details
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Admin: Create a book
export const createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: "Invalid book data" });
  }
};

// Admin: Update a book
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      book.name = req.body.name || book.name;
      book.price = req.body.price || book.price;
      book.category = req.body.category || book.category;
      book.image = req.body.image || book.image;
      book.title = req.body.title || book.title;

      const updatedBook = await book.save();
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Admin: Delete a book
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      await Book.deleteOne({ _id: req.params.id });
      res.json({ message: "Book removed" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};