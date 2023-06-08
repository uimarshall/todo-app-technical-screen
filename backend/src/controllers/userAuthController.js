const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
// const User = require('../models/User');
const db = require('../models');

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

  res.status(201).json({
    success: true,
    data: newUser,
  });
});
