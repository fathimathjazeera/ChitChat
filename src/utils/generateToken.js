const jwt = require('jsonwebtoken')

const generateTokenAndSetCookie = (userId,res)=>{
const token = jwt.sign({userId}, process.env.SECRET_KEY,{
    expiresIn:"15d"
})
res.cookie("authToken" ,token,{ 
    maxAge:15* 24* 60 * 1000,
    httpOnly:true, //prevent XSS attacks cross-site scripting attacks
    sameSite:"strict" ,//CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development"
})
}


module.exports = generateTokenAndSetCookie