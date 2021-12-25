const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  agencyName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  profilePicture: {
    type: String,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  password: {
    type: String,
  },
  whatsapp: {
    type: String,
  },
  bio: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("HostelUser", userSchema);

module.exports = User;
