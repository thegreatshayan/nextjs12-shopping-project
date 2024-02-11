import bcrypt from "bcryptjs"

const users = [
  {
    name: "Admin",
    email: "admin@test.com",
    password: bcrypt.hashSync("12345"),
    isAdmin: true
  },
  {
    name: "User1",
    email: "test1@test.com",
    password: bcrypt.hashSync("12345"),
    isAdmin: false
  },
  {
    name: "User2",
    email: "test2@test.com",
    password: bcrypt.hashSync("12345"),
    isAdmin: false
  }
]

export default users