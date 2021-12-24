const mongoose = require("mongoose");

const accomodationSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  images: {
    type: Array,
  },
  location: {
    type: String,
  },
  price: {
    type: String,
  },
  description: {
    type: String,
  },
  renewal: {
    type: String,
  },
  features: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Accomodation = mongoose.model("HostelAccomodation", accomodationSchema);

module.exports = Accomodation;
