const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password_hash: {
      type: String,
    },
    github_id: {
      type: String,
      unique: true,
      sparse: true,
    },
    google_id: {
      type: String,
      unique: true,
      sparse: true,
    },
    avatar_url: {
      type: String,
      default: "https://placehold.co/150"
    },
  },
  { timestamps: true, strict: true },
);

module.exports = mongoose.model("Users", UserSchema);
