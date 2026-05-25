import "dotenv/config";
import express from "express"
import prisma from "./src/lib/db.js"

const app = express()

app.get("/", (req, res) => {
  res.send("Server is running 🚀")
})

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000")
})

async function createUser() {
  const newUser = await prisma.user.create({
    data: {
      name: "Famous",
      email: "efg@gmail.com",
      password: "123",
    }
  });
  console.log("User created successfully", newUser);
}

createUser()
  .catch(e => {
    console.log(e)
  })
  .finally(async () => {
    await prisma.$disconnect();
  })