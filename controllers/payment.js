const User = require("../models/User.js");
const Payment = require("../models/Payment.js");

exports.payment = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(400).json({
        message: "This user does not exist.",
      });
    } else {
      const savePayment = await Payment.create({
        transaction: req.body,
      });
      savePayment.save();

      await User.findOneAndUpdate(
        {
          _id: req.user.id,
        },
        {
          $set: {
            isVerified: true,
          },
        }
      );

      return res.status(201).json({
        message: "You have successfully verified your account with us",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getPayment = async (req, res) => {
  try {
    const payment = await Payment.find();
    return res.status(200).json({
      message: payment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
