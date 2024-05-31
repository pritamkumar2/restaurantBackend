import Order from "../models/Order.js";
import Razorpay from "razorpay";
import mongoose from "mongoose";

const razorpay = new Razorpay({
  key_id: "rzp_test_KJZZUOEkXTlMu8",
  key_secret: "qyZP5VmoGfm2LVjuGr6OZ2Wf",
});

// Create an order

export const createOrder = async (req, res) => {
  const { userTable, cartItems, name, phone } = req.body;

  try {
    console.log("Request body:", req.body); // Log the request body

    const newOrder = new Order({
      userTable,
      cartItems,
      name,
      phone,
    });
    const savedOrder = await newOrder.save();

    console.log("Saved order:", savedOrder); // Log the saved order

    res.status(200).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: error.message });
  }
};

// Verify and update order status
// Verify and update order status
export const verifyPayment = async (req, res) => {
  const { razorpayPaymentId, orderId } = req.body;

  try {
    console.log("Verify Payment Request Body:", req.body); // Log the request body

    const order = await Order.findById(orderId);
    console.log("Order found:", order); // Log the found order

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.razorpayPaymentId = razorpayPaymentId;
    order.status = "success";
    await order.save();

    console.log("Updated Order:", order); // Log the updated order

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
