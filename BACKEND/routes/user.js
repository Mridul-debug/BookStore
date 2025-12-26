const router = require("express").Router();
const User = require("../models/user.js");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {authentication}=require("./userAuth.js")
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address,role } = req.body;

    // username length
    if (username.length < 4) {
      return res.status(400).json({
        message: "Username length should be greater than 3",
      });
    }

    // username already exists?
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    // email already exists?
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // password length
    if (password.length <= 5) {
      return res.status(400).json({
        message: "Password length should be greater than 5",
      });
    }

    // create new user
    const newUser = new User({
      username,
      email,
      password,
      address,
      role,
    });

    await newUser.save();
    return res.status(200).json({
      message: "SignUp successfully",
    });

  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});



router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;

    // check user exists
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // compare password and create jwt token
    await bcrypt.compare(password,existingUser.password,(err,data)=>{
      if(data){
        const authClaims=[
          {name:existingUser.username},
          {role:existingUser.role}
        ]
        const token=jwt.sign({authClaims},"bookstore123",{
          expiresIn:"30d",
        })

        res.status(200).json({id:existingUser._id,role:existingUser.role,
          token:token,
        })
      }
      else{
        res.status(400).json({message:"Invalid Credentials"})
      }
    })

  } catch (error) {
    console.error("SIGNIN ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/get-user-information",authentication,async(req,res)=>{
  try {
    const {id}=req.headers
    const data=await User.findById(id).select("-password")
    return res.status(200).json(data)
    
  } catch (error) {
    res.status(500).json({message:"Internal Server Error"})
  }
})

router.get("/get-userbyUsername", async (req, res) => {
  try {
    const { username } = req.headers;

    const data = await User.findOne({ username })
      .select("-password");

    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/delete-user", async (req, res) => {
  try {

    const { username } = req.headers;

    const deletedUser = await User.findOneAndDelete({ username });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


router.put("/update-address",authentication,async(req,res)=>{
  try {
    const {id}=req.headers
    const {address}=req.body
    await User.findByIdAndUpdate(id,{address})
    return res.status(200)
              .json({message:"address updated successfully"})
  } catch (error) {
    res.status(500).json({message:"Internal Server Error"})
  }
})
 

module.exports = router;
