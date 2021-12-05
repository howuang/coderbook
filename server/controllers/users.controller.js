const bcrypt = require("bcryptjs");
const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const User = require("../models/User");

const userController = {};

userController.create = catchAsync(async (req, res, next) => {
  let { firstName, surname, email, password, dob, gender } = req.body;
  let user = await User.findOne({ email });

  if (user)
    return next(new AppError(409, "User already exists", "Register Error"));

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  user = await User.create({
    firstName,
    surname,
    email,
    password,
    dob,
    gender
  });

  const accessToken = await user.generateToken();
  return sendResponse(
    res,
    200,
    true,
    { user, accessToken },
    null,
    "Create user successful"
  );
});

userController.createWithGoogle = catchAsync(async (req, res, next) => {
  const userInfo = req.user;
  console.log("user info", userInfo);
  const found = await User.findOne({ email: userInfo.emails[0].value });
  if (found)
    return next(new AppError(409, "User already exists", "Register Error"));
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash("123", salt);
   const newUser = {
     firstName: userInfo.name.givenName,
     surname: userInfo.name.familyName,
     avatar: userInfo.photos[0].value,
     email: userInfo.emails[0].value,
     password,
   };
  console.log("new user", newUser)
  result = await User.create(newUser);
  return sendResponse(
    res,
    200,
    true,
    userInfo,
    null,
    "Create user successful with Google"
  );
})

userController.readUser = async (req, res) => {
  const {displayName} = req.params

  const user = await User.findOne({ displayName }).lean();
  if (!user) {
    res.status(404).json({ message: "User not Found" });
  } else {
    return sendResponse(
    res,
    200,
    true,
    user,
    null,
    "Get Single User"
  );
  }
};

userController.getCurrentUser = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  console.log("user id", userId);
  console.log("userId", userId)
  const user = await User.findById(userId).lean()
  console.log("user", user)
  if (!user) {
    res.status(404).json({ message: "User not Found" });
  } else {
    return sendResponse(
    res,
    200,
    true,
    user,
    null,
    "Get Single User"
  );
  }
})

userController.update = async (req, res) => {
  await User.findByIdAndUpdate(
    { _id: req.params.id },
    { email: req.body.email },
    { new: true },
    (err, user) => {
      console.log({ err, user });
      if (!user) {
        res.status(404).json({ message: "User not Found" });
      } else {
        res.json(user);
      }
    }
  );
};

userController.destroy = async (req, res) => {
  await User.findByIdAndDelete(req.params.id, (err, user) => {
    if (!user) {
      res.status(404).json({ message: "User not Found" });
    } else {
      res.json(user);
    }
  });
};

module.exports = userController;
