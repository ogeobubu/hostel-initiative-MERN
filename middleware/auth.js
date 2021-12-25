const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        message: "You are not authorized to access this.",
      });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
      if (error)
        return res.status(401).json({
          message: "Invalid Authentication",
        });

      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = auth;
