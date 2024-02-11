import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import Order from "../../../models/order";
import db from "../../../utils/db";

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  const { user } = session;

  await db.connect();

  if (!session || (session && !user.isAdmin)) {
    return res.send({ message: "Login Required" });
  }

  const orders = await Order.find();

  res.send(orders);
};

export default handler;
