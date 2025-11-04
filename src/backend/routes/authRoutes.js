const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const router = express.Router()

router.post("/register",async(req,res)=>{
    try{
        const {username,email,password} = req.body

        const existingUser = await User.findOne({email})

        if(existingUser){
           return res.status(400).json({message:"User Already Exist"})
        }

        const hasedpassword = await bcrypt.hash(password,10)

        const user = new User({
            username,
            email,
            password:hasedpassword,
        })

        await user.save()

        res.status(201).json({message: "User registered successfully"})
    }
    catch(err){
          res.status(500).json({ message: err.message });
    }
})

router.post("/login",async (req,res)=>{
    const {email,password} = req.body
    try{
        const user = await User.findOne({email})
        if(!user){return res.status(400).json({message:"Invalid Credentials"})}

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){return res.status(400).json({message:"Invalid Credentials"})}

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "1h",
        })

        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})
module.exports = router