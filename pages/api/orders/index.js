import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import db from "../../../utils/db";
import Order from "../../../models/order";

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.send("Sign in required!");
  }

  const { user } = session;

  await db.connect();

  const newOrder = new Order({
    ...req.body,
    user: user._id
  });

  const order = await newOrder.save();

  res.status(201).send({order , session});
};

export default handler;
