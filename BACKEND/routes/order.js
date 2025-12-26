const router = require("express").Router();
const User = require("../models/user.js");
const Book = require("../models/book.js");
const Order = require("../models/order.js");
const { authentication } = require("./userAuth.js");


// ─────────────────────────────────────────────
// PLACE ORDER
// ─────────────────────────────────────────────

router.post("/place-order", authentication, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;   // Array of book IDs

    // Remove duplicates from req.body.order
    const uniqueOrderBooks = [
      ...new Map(order.map(o => [o._id, o])).values()
    ];

    for (const orderData of uniqueOrderBooks) {
      // Create new order document
      const newOrder = new Order({
        user: id,
        book: orderData._id,
      });

      const orderSaved = await newOrder.save();

      await User.findByIdAndUpdate(id, {
        $push: { orders: orderSaved._id }
      });

      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id }
      });
    }

    return res.json({
      status: "success",
      message: "Order Placed Successfully!"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An Error has occurred" });
  }
});



// ─────────────────────────────────────────────
// GET USER ORDER HISTORY
// ─────────────────────────────────────────────

router.get("/get-order-history", authentication, async (req, res) => {
  try {
    const { id } = req.headers;

    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" }
    });

    const ordersData = userData.orders.reverse();

    return res.json({
      status: "success",
      data: ordersData,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An Error has occurred" });
  }
});


// ─────────────────────────────────────────────
// GET ALL ORDERS (ADMIN ONLY)
// ─────────────────────────────────────────────

router.get("/get-all-orders", authentication, async (req, res) => {
  try {
   const { id } = req.headers;
    const user = await User.findById(id);

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const orders = await Order.find()
      .populate("book")
      .populate("user")
      .sort({ createdAt: -1 });

    return res.json({
      status: "success",
      data: orders
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An Error has occurred" });
  }
});


// ─────────────────────────────────────────────
// UPDATE ORDER STATUS (ADMIN ONLY)
// ─────────────────────────────────────────────

router.put("/update-status/:id", authentication, async (req, res) => {
  try {
    const { id: userId } = req.headers;

    const user = await User.findById(userId);
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const orderId = req.params.id;

    await Order.findByIdAndUpdate(orderId, { status: req.body.status });

    return res.json({
      status: "success",
      message: "Status Updated Successfully"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An Error has occurred" });
  }
});

module.exports = router;
