import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Resume from "../models/Resume.js";

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};

// post

//register

export const registerUser = async (req, res) => {
  try {
    console.log("STEP 1 - REGISTER BODY:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      console.log("STEP 2 - Missing fields");
      return res.status(400).json({ message: "Missing required fields" });
    }

    console.log("STEP 3 - Checking user in MongoDB");

    const user = await User.findOne({ email });

    console.log("STEP 4 - User query completed:", !!user);

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    console.log("STEP 5 - Hashing password");

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("STEP 6 - Creating user");

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("STEP 7 - User created");

    const token = generateToken(newUser._id);

    newUser.password = undefined;

    console.log("STEP 8 - Registration successful");

    return res.status(201).json({
      message: "User created successfully",
      token,
      user: newUser,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error.message);
    console.error(error);

    return res.status(400).json({
      message: error.message,
    });
  }
};

//user login

//login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //user exists?

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //correct password?

    if (!user.comparePassword(password)) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //success msg

    // create new user
    const hashedPassword = await bcrypt.hash(password, 10);

    //return success message

    const token = generateToken(user._id);
    user.password = undefined;

    return res.status(200).json({ message: "Login successfull", token, user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//user by id

//data

export const getUserById = async (req, res) => {
  try {
    const userId = req.userId;

    //if user exists?

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //return user

    user.password = undefined;

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
    
  }
};


//controller for getting user resume
//GET:/api/users/resumes

export const getUserResumes = async (req,res) => {

  try {

    const userId = req.userId;

    //return user resumes
    const resumes = await Resume.find({userId})

    return res.status(200).json({resumes})
    
  } catch (error) {

    return res.status(400).json({ message: error.message });
    
  }

}
