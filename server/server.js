const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ================= DATABASE CONNECTION =================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ================= USER MODEL =================

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

// ================= EXPENSE DATA =================

let expenses = [];

// ================= ROUTES =================

// Home Route
app.get("/", (req, res) => {
  res.send("FinTrack API Running");
});

// ================= AUTH ROUTES =================

// Register API
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check Existing User
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Create User
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User Registered Successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Login API
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find User
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    // Generate Token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= EXPENSE ROUTES =================

// Get Expenses
app.get("/expenses", (req, res) => {
  res.json(expenses);
});

// Add Expense
app.post("/expenses", (req, res) => {

  const expense = req.body;

  expenses.push(expense);

  res.json({
    message: "Expense Added Successfully",
  });
});

// ================= SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});