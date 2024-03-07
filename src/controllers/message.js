const Conversation = require("../models/conversation");
const Message = require('../models/message')

const sendMessage = async (req,res)=>{
    const {message} = req.body;
    const {id:recieverId} = req.params
    const senderId = req.user._id

let conversation = await Conversation.findOne({
    participants:{
        $all:[senderId, recieverId]
    }
})
if(!conversation){
    conversation = await Conversation.create({
        participants:[senderId,recieverId]
    })
}

const newMessage = new Message({
    senderId,
    recieverId,
    message
})

if(newMessage){
    conversation.messages.push(newMessage._id)
}

res.status(201).json({newMessage})


}


module.exports= {
    sendMessage
}