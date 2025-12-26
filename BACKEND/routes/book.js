const router = require("express").Router();
const User = require("../models/user.js");
const Book = require("../models/book.js");
const { authentication } = require("./userAuth.js");

// ───────────────────────────────────────────────
// ADD BOOK  (ADMIN ONLY)
// ───────────────────────────────────────────────

router.post("/add-book", authentication, async (req, res) => {
  try {
    // Use ID from JWT, not headers
    const { id } = req.headers;

    const user = await User.findById(id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "You are not authorized to add books" });
    }

    const book = new Book({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });

    await book.save();

    res.status(200).json({ message: "Book added successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error" });
  }
});


// ───────────────────────────────────────────────
// UPDATE BOOK  (ADMIN ONLY)
// ───────────────────────────────────────────────

router.put("/update-book", authentication, async (req, res) => {
  try {
    const { id } = req.headers;
    const admin = await User.findById(id);

    if (!admin) {
      return res.status(403).json({ message: "You are not authorized to update books" });
    }

    const { bookid } = req.headers;

    const bookExist = await Book.findById(bookid);

    if (!bookExist) {
      return res.status(400).json({ message: "This book doesn't exist" });
    }

    await Book.findByIdAndUpdate(bookid, {
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });

    return res.status(200).json({ message: "Book updated successfully!" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});


// ───────────────────────────────────────────────
// DELETE BOOK  (ADMIN ONLY)
// ───────────────────────────────────────────────

router.delete("/delete-book", authentication, async (req, res) => {
  try {
    const { id } = req.headers;
    const admin = await User.findById(id);

    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ message: "You are not authorized to delete books" });
    }

    const { bookid } = req.headers;

    const bookExist = await Book.findById(bookid);

    if (!bookExist) {
      return res.status(400).json({ message: "Book doesn't exist" });
    }

    await Book.findByIdAndDelete(bookid);

    return res.status(200).json({ message: "Book deleted successfully!" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
});


// ───────────────────────────────────────────────
// GET ALL BOOKS
// ───────────────────────────────────────────────

router.get("/get-all-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    return res.json({
      status: "success",
      data: books,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});


// ───────────────────────────────────────────────
// GET RECENT BOOKS (LIMIT 4)
// ───────────────────────────────────────────────

router.get("/get-recent-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);

    return res.json({
      status: "success",
      data: books,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});


// ───────────────────────────────────────────────
// GET BOOK BY ID
// ───────────────────────────────────────────────

router.get("/get-book-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(400).json({ message: "Book doesn't exist" });
    }

    return res.json({
      status: "success",
      data: book,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
});


module.exports = router;
