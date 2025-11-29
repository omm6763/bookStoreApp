import express from "express";
import Order from "../model/order.model.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// ... (Keep existing Create, Get, and Clear History routes) ...

// EXISTING: Create Order
router.post("/", protect, async (req, res) => {
  const { orderItems, totalPrice } = req.body;
  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }
  const order = new Order({
    user: req.user._id,
    orderItems,
    totalPrice,
    isPaid: true,
  });
  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// EXISTING: Get My Orders
router.get("/myorders", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

// EXISTING: Clear All History
router.delete("/myorders", protect, async (req, res) => {
  try {
    await Order.deleteMany({ user: req.user._id });
    res.json({ message: "Order history cleared" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// NEW: Delete specific book from order history
router.delete("/item/:orderId/:itemId", protect, async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.orderId, user: req.user._id });
        
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Filter out the item to be removed
        order.orderItems = order.orderItems.filter(
            (item) => item._id.toString() !== req.params.itemId
        );

        // If order becomes empty, delete the whole order
        if (order.orderItems.length === 0) {
            await Order.deleteOne({ _id: req.params.orderId });
            return res.json({ message: "Order removed completely" });
        }

        await order.save();
        res.json({ message: "Item removed" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;