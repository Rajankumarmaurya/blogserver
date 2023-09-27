import express from "express"
const router = express.Router();
import User from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import 'dotenv/config.js'
import fetchUser from "../middleware/fetchUser.js";

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body
  try {
    if (!name, !email, !password) {
      return res.status(400).json({ error: "All field are required" })
    }
    //email validation

    if (!email.includes('@')) {
      return res.status(400).json({ error: "Please enter a valid email" })
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exist" })
    }
    //generate the salt for the password hasing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    //save data in the database
    const newUser = await User({
      name, email, password: hashedPassword
    })

    await newUser.save()
    console.log(newUser)
    res.status(200).json({ success: "Signup succesfull" })

  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "All field are the required" })
    }
    if (!email.includes('@')) {
      return res.status(400).json({ error: "Please enter a valid email" })
    }
    // Find the unique user
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ error: "User not found" })
    }
    //matching the password from the bcrypt 
    const doMatch = await bcrypt.compare(password, user.password);
    console.log(doMatch)

    if (doMatch) {
      const token = jwt.sign({ userId: user.id },"" + process.env.JWT_SECURE, {
        expiresIn: "30d"
      })
      res.status(201).json({ token, success:"Login success" })
    } else {
      return res.status(400).json({ error: "Email and password not found" })
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error")

  }
})

router.get("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.userId;
    console.log("getuser Id", userId)
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal server Error" })
  }
})

export default router;