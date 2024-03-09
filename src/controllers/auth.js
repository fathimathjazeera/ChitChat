const User= require('../models/user')
const bcryptjs = require('bcryptjs')
const generateTokenAndSetCookie = require('../utils/generateToken')

const signUp = async(req,res)=>{
const {fullName,username,password,confirmPassword,gender} = req.body
if(password !== confirmPassword){
    return res.status(400).json({error:"Passwords don't match"})
}
const user = await User.findOne({username})

if(user){
    return res.status(400).json({error:"Username already exists"})
}
//HASHING PASSWORD
const salt = await bcryptjs.genSalt(10)
const hashedPassword = await bcryptjs.hash(password, salt)
const boyProfilePic= `https://avatar.iran.liara.run/public/boy?username=${username}`
const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

const newUser = new User({
    fullName,
    username,
    password:hashedPassword, 
    gender,
    profilePic:gender === "male" ? boyProfilePic : girlProfilePic
})
if(newUser){
    generateTokenAndSetCookie(newUser._id,res)
    await newUser.save()
    res.status(201).json({
        _id:newUser._id,
        fullName:newUser.fullName,
        profilePic:newUser.profilePic
    
    })
}else{
    res.status(400).json({error:"Invalid user data"})
}

}





const login =async(req,res)=>{
const {username,password} = req.body
const user= await User.findOne({username})
const isPasswordCorrect= await bcryptjs.compare(password, user?.password || "")

if(!user || !isPasswordCorrect){
    return res.status(400).json({error:"Invalid username or password"})
}

generateTokenAndSetCookie(user._id,res)
res.status(200).json({
    _id:user._id,
    fullName:user.fullName,
    profilePic:user.profilePic
})

}


const logout = (req,res)=>{
res.cookie("authToken","",{maxAge:0})
res.status(200).json({message:"Logged out successfully"})
}



module.exports ={
   signUp,
   login,
   logout
}