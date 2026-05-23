const express = require("express");

const router = express.Router();

// CONTROLLERS

const {
  register,
  login,
} = require("../controllers/authController");

// ================= AUTH ROUTES =================

// REGISTER USER

router.post(
  "/register",
  register
);

// LOGIN USER

router.post(
  "/login",
  login
);

// ================= TEST ROUTE =================

router.get("/", (req, res) => {

  res.json({

    success: true,

    message:
      "Auth Routes Working Successfully 🚀",

  });

});

// EXPORT ROUTER

module.exports = router;