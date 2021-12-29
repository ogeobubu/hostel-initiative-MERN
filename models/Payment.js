const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  transaction: Object,
});

const Payment = mongoose.model("HostelPayment", paymentSchema);

module.exports = Payment;
