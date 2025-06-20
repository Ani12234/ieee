const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(`Login attempt for email: ${email}`);
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      console.log(`User not found: ${email}`);
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    // Determine environment and set cookie options accordingly
    const isProduction = process.env.NODE_ENV === 'production';
    console.log(`Setting cookie in ${isProduction ? 'production' : 'development'} mode`);
    
    // For debugging in production
    console.log('JWT Token generated successfully with payload:', {
      id: checkUser._id,
      role: checkUser.role,
      email: checkUser.email
    });
    
    const cookieOptions = { 
      httpOnly: true, 
      secure: isProduction, // Use secure cookies in production
      sameSite: isProduction ? 'none' : 'lax', // Needed for cross-origin in production
      domain: isProduction ? '.vercel.app' : undefined, // Set domain for production
      path: '/', // Ensure cookie is accessible across all paths
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      // Additional options for Vercel
      sameSite: 'none',
      secure: true
    };
    
    console.log('Cookie options:', cookieOptions);
    
    res.cookie("token", token, cookieOptions).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//logout

const logoutUser = (req, res) => {
  // Determine environment and set cookie options consistently with login
  const isProduction = process.env.NODE_ENV === 'production';
  res.clearCookie("token", { 
    httpOnly: true, 
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    domain: isProduction ? undefined : 'localhost'
  }).json({
    success: true,
    message: "Logged out successfully!",
  });
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
