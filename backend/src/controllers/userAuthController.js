/* eslint-disable consistent-return */
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const db = require('../models');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');

const User = db.user;

// @desc: Register a new user
// @route: /api/v1/user/register
// @access: protected
exports.registerUser = catchAsyncErrors(async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
  });

  sendToken(newUser, 201, res);

  // const token = newUser.getJwtToken();

  // res.status(201).json({
  //   success: true,
  //   token,
  // });
});

// @desc: Login a user
// @route: /api/v1/user/login
// @access: protected

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  // Check if email and password is entered in by user
  if (!email || !password) {
    return next(new ErrorHandler('Please enter email and password', 400));
  }

  // Find user in database
  const userFound = await User.findOne({
    where: { email },
  });
  if (!userFound) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  // Check if password is correct or not
  const isPasswordMatched = await userFound.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  // sendToken(userFound, 200, res);

  // let token = userFound.getJwtToken();
  // token = `Bearer ${token}`;
  sendToken(userFound, 200, res);

  // return res.status(200).json({
  //   success: true,
  //   token,
  //   userFound,
  // });
});
