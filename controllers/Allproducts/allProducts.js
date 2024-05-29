import Product from "../../models/allProduct-models.js";
export const allProducts = async (req, res) => {
  try {
    const productData = await Product.find();
    console.log(
      "i am productct data ////////////////////////////",
      productData
    );
    if (!productData) {
      return res
        .status(400)
        .json({ message: "error is there in controllers products" });
    }

    res.status(200).json({ data: productData });
  } catch (err) {
    console.error("Error from controllers product ", err);
    res.status(500).send("Internal Server Error");
  }
};
