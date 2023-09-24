const express = require("express");
const router = express.Router();
const Book = require("../models/book");

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get a book by ID
router.get("/:id", async (req, res) => {
  try {
    const bookId = req.params.id;

    // Check if the book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Add a new book
router.post("/", async (req, res) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update a book by ID
router.put("/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const updatedBook = req.body;

    const result = await Book.findByIdAndUpdate(bookId, updatedBook, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete a book by ID
router.delete("/:id", async (req, res) => {
  try {
    const bookId = req.params.id;

    // Check if the book exists
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    // Delete the book
    await Book.findByIdAndRemove(bookId);
    res.status(200).json({ message: "Deleted Book successFully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
