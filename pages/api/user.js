import db from "../../utils/db";
import User from "../../models/user";
import users from "../../data/users";

const Handler = async (req, res) => {
  await db.connect();

  await User.deleteMany();

  await User.insertMany(users);

  res.send({ message: "Users Added!" });
};

export default Handler;
