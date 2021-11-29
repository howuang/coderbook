const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const { AppError } = require("../helpers/utils.helper");
const User = require("../models/User");
const authMiddleware = {};

authMiddleware.loginRequired = async (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString)
      return next(new AppError(401, "Login required", "Validation Error"));
    const token = tokenString.replace("Bearer ", "");
    const decripted = jwt.verify(token, JWT_SECRET_KEY);
    const user = await User.findById(decripted._id);
    req.currentUser = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
