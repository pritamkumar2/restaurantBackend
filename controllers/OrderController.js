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
export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  console.log("Received data for verification:", req.body);

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid payment verification data" });
  }
};

export const rzpGetKey = (req, res) => {
  res.status(200).send({ success: true, key: process.env.RZP_APIKEY });
};
