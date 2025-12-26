const router = require("express").Router();
const User = require("../models/user.js");
const Book = require("../models/book.js");
const { authentication } = require("./userAuth.js");


// ─────────────────────────────────────────────
// ADD TO CART
// ─────────────────────────────────────────────

router.put("/add-to-cart", authentication, async (req, res) => {
  try {
    const { id } = req.headers;
    const { bookid } = req.headers;

    const userData = await User.findById(id);

    const isBookInCart = userData.cart.includes(bookid);

    if (isBookInCart) {
      return res.status(200).json({ message: "Book is already in the Cart" });
    }

    await User.findByIdAndUpdate(id, {
      $push: { cart: bookid }
    });

    return res.status(200).json({ message: "Book added to Cart" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


// ─────────────────────────────────────────────
// REMOVE FROM CART
// ─────────────────────────────────────────────

router.put("/remove-from-cart/:bookid", authentication, async (req, res) => {
  try {
    const { id } = req.headers;
    const { bookid } = req.params;

    const userData = await User.findById(id);

    const isBookInCart = userData.cart.includes(bookid);

    if (isBookInCart) {
      await User.findByIdAndUpdate(id, {
        $pull: { cart: bookid }
      });
    }

    return res.status(200).json({ message: "Book removed from Cart" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


// ─────────────────────────────────────────────
// GET USER CART
// ─────────────────────────────────────────────

router.get("/get-user-cart", authentication, async (req, res) => {
  try {
    const { id } = req.headers;

    const userData = await User.findById(id).populate("cart");

    if (!userData) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const cart = [...userData.cart].reverse(); // safe copy

    return res.status(200).json({
      status: "success",
      data: cart
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;
