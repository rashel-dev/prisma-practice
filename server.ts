import "dotenv/config";
import express from "express"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });
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
      name: "Rashel",
      email: "abc@gmail.com",
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