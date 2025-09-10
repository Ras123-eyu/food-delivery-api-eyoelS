import User from "../models/User.js";
import jwt from "jsonwebtoken";
const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      message: "User registered",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email },
  });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1H" }
  );
  res.status(200).json({
    message: "Login successful",
    token,
  });
};

export { register, login };
