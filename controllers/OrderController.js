import Order from "../models/Order.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: "rzp_test_KJZZUOEkXTlMu8",
  key_secret: "qyZP5VmoGfm2LVjuGr6OZ2Wf",
});

// Create an order
export const createOrder = async (req, res) => {
  const { userTable, cartItems, name, phone } = req.body;

  try {
    const razorpayOrder = await razorpay.orders.create({
      amount: 50000, // Amount in paise (for 500.00 INR)
      currency: "INR",
      receipt: "order_rcptid_11",
    });

    const newOrder = new Order({
      userTable,
      cartItems,
      name,
      phone,
      razorpayOrder: razorpayOrder?.id, // Store Razorpay order ID
    });

    const savedOrder = await newOrder.save();

    res.status(200).json({ id: razorpayOrder.id, ...savedOrder._doc });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: error.message });
  }
};

// Verify and update order status
export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature);
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid payment verification data" });
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RZP_APISECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    try {
      // Find the order in MongoDB and update its payment status to "Completed"
      const order = await Order.findOne({ razorpayOrder: razorpay_order_id });
      if (!order) {
        return res
          .status(404)
          .json({ success: false, message: "Order not found" });
      }

      order.paymentStatus = "Completed";
      await order.save();

      res
        .status(200)
        .json({ success: true, message: "Payment verification successful" });
    } catch (err) {
      console.error("Error updating order:", err);
      res.status(500).json({
        success: false,
        message: "Error updating order",
        error: err.message,
      });
    }
  } else {
    res
      .status(400)
      .json({ success: false, message: "Invalid payment signature" });
  }
};

// Get Razorpay key
export const rzpGetKey = (req, res) => {
  res.status(200).json({ key: process.env.RZP_APIKEY });
};
