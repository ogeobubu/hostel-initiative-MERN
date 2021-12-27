const User = require("../models/User.js");
const Accomodation = require("../models/Accomodation.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
  try {
    const { firstName, lastName, agencyName, email, phone, address, password } =
      req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "This user already exists.",
      });
    }

    if (
      !firstName ||
      !lastName ||
      !agencyName ||
      !email ||
      !phone ||
      !address ||
      !password
    ) {
      return res.status(400).json({
        message: "All fields required!",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const userDetails = {
      firstName,
      lastName,
      agencyName,
      email,
      phone,
      address,
      password: hashPassword,
    };

    const createUser = await User.create(userDetails);
    createUser.save();

    res.status(200).json({
      message: createUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "This user does not exist!",
      });
    } else {
      const loginUser = {
        email,
        password,
      };

      const comparePasswords = await bcrypt.compare(password, user.password);

      if (!comparePasswords) {
        return res.status(400).json({
          message: "Password is incorrect",
        });
      } else {
        const createRefreshToken = (payload) => {
          return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "7d",
          });
        };

        const refresh_token = createRefreshToken({ id: user._id });

        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/api/users/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
          message: "You have successfully logged in.",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAccessToken = (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;

    if (!rf_token)
      return res.status(400).json({ message: "Please login now!" });

    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
      if (error) return res.status(400).json({ message: "Please login now!" });

      const createAccessToken = (payload) => {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "15m",
        });
      };

      console.log(user);

      const access_token = createAccessToken({ id: user.id });

      res.status(200).json({ access_token });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(400).json({
        message: "This user does not exists.",
      });
    } else {
      return res.status(200).json({
        message: user,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.accomodationUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });

    if (!user) {
      return res.status(400).json({
        message: "This user does not exist.",
      });
    } else {
      const { isVerified, isAdmin, password, ...rest } = user._doc;
      return res.status(200).json({
        message: rest,
      });
    }
    res.send(user);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(400).json({
        message: "This user does not exists.",
      });
    } else {
      if (req.body.password) {
        const hashPassword = await bcrypt.hash(req.body.password, 12);
        await User.findOneAndUpdate(
          {
            _id: req.user.id,
          },
          {
            $set: { password: hashPassword },
          }
        );
      } else {
        await User.findOneAndUpdate(
          {
            _id: req.user.id,
          },
          {
            $set: req.body,
          }
        );
      }
    }
    return res.status(200).json({
      message: "Profile has been updated.",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getUserAllAccomodations = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const accomodations = await Accomodation.find({ userId: user._id });

    if (!user) {
      return res.status(400).json({
        message: "This user does not exist.",
      });
    } else if (!accomodations) {
      return res.status(400).json({
        message: "This user does not have any accomodation available.",
      });
    } else {
      return res.status(200).json(accomodations);
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/api/users/refresh_token" });
    return res.status(200).json({ message: "Logged out." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
