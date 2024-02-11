import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import Order from "../../../models/order";
import User from "../../../models/user";
import Product from "../../../models/product";
import db from "../../../utils/db";

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  const { user } = session;

  await db.connect();

  if (!session || (session && !user.isAdmin)) {
    return res.send({message : "Login Required"});
  }

  const ordersCount = await Order.countDocuments();
  const productsCount = await Product.countDocuments();
  const usersCount = await User.countDocuments();

  res.status(200).send([{ ordersCount, productsCount, usersCount }]);
};

export default handler;
