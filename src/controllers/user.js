const User = require('../models/user')

const getUsers= async(req,res)=>{

try{

const loggedInUser = req.user._id
const filteredUsers = await User.find({_id:{$ne:loggedInUser}}).select("-password")
res.status(200).json(filteredUsers)



} catch (error) {
    console.log("Error in getusers controller: ", error.message);
    res.status(500).json({
        status:"failure",
        message:"something went wrong",
        error_message: error.message,
       })
}




}
module.exports = {
    getUsers
}
