import "dotenv/config";
import express from "express"
import prisma from "./src/lib/db.js"

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Server is running 🚀")
})

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000")
})

// GET: Fetch all users
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// POST: Create a new user
app.post("/users", async(req, res) => {
    const { name, email, password } = req.body;
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    });
    res.json(newUser);
})