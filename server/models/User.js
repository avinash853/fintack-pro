const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  // USER NAME

  name: {
    type: String,
    required: true,
    trim: true,
  },

  // EMAIL

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },

  // PASSWORD

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  // CREATED DATE

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

// EXPORT MODEL

module.exports = mongoose.model(
  "User",
  userSchema
);