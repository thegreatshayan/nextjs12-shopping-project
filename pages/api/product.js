import db from "../../utils/db";
import products from "../../data/products";
import Product from "../../models/product";

const handler = async (req, res) => {
  await db.connect();

  await Product.deleteMany();

  await Product.insertMany(products);

  res.send({ message: "Products added!" });
};

export default handler;
