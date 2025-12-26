const router = require("express").Router();
const User = require("../models/user.js");
const Book = require("../models/book.js");
const { authentication } = require("./userAuth.js");


// ─────────────────────────────────────────────
// ADD BOOK TO FAVOURITES
// ─────────────────────────────────────────────

router.put("/add-book-to-favourite", authentication, async (req, res) => {
  try {
    const {bookid, id } = req.headers;        // secure ID from JWT

    const userData = await User.findById(id);

    const isBookFavourite = userData.favourites.includes(bookid);
    if (isBookFavourite) {
      return res.status(200).json({ message: "Book is already in favourites" });
    }

    await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });

    return res.status(200).json({ message: "Book added to favourites" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// ─────────────────────────────────────────────
// REMOVE BOOK FROM FAVOURITES
// ─────────────────────────────────────────────

router.put("/remove-book-from-favorite", authentication, async (req, res) => {
  try {
    const { id, bookid } = req.headers;

    const userData = await User.findById(id);

    const isBookFavourite = userData.favourites.includes(bookid);

    if (isBookFavourite) {
     await User.findByIdAndUpdate(id, {
      $pull: { favourites: bookid },
    });
    }

    

    return res.status(200).json({
      message: "Book removed from favourite",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});



// ─────────────────────────────────────────────
// GET ALL FAVOURITE BOOKS
// ─────────────────────────────────────────────

router.get("/get-favourites-books", authentication, async (req, res) => {
  try {
    const { id } = req.headers;

    const userData = await User.findById(id).populate("favourites");

    return res.json({
      status: "success",
      data: userData.favourites,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error has occurred" });
  }
});


module.exports = router;
