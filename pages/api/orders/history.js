import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import db from "../../../utils/db";
import Order from "../../../models/order";

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  const { user } = session;

  await db.connect();

  if (!user) {
    return res.send("Login Required");
  }

  const orders = await Order.find({ user: user._id });

  res.send({ orders });
};

export default handler;
