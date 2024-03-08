const Conversation = require("../models/conversation");
const Message = require('../models/message')

const sendMessage = async (req,res)=>{
    try{
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
        console.log(newMessage,"message from sendmessage")
        conversation.messages.push(newMessage._id)
    }
    // await conversation.save()
    // await newMessage.save()

    await Promise.all([conversation.save(), newMessage.save()])
    
    res.status(201).json({newMessage})
    }catch(err){
        console.log(err.message)
        res.status(500).json({
         status:"failure",
         message:"something went wrong",
         error_message: err.message,
        })
    }
   


}



// const getMessages=async(req,res)=>{
// try{
// const {id:userToChatId} = req.params
// const senderId = req.user._id

// const conversation = await Conversation.findOne({
//     participants:{$all :{senderId,userToChatId}}
// }).populate("messages")
// res.status(200).json(
//    conversation.messages
// )
// }catch(error){
//     console.log(error.message)
//     res.status(500).json({
//         status:"failure",
//         message:"something went wrong",
//         error_message: error.message,
//     })
// }


// }
const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};


module.exports= {
    sendMessage,
    getMessages
}