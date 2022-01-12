const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    // Store agent token for authorization
    const token = req.header("Authorization");

    // Function to check if there is token or not.
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
    // If there is an error return this.
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = auth;
