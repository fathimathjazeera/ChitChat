const express = require('express')
const router = express.Router()
const protectRoute= require('../middlewares/protectRoute')
const {sendMessage, getMessages} = require('../controllers/message')



router.get("/:id",protectRoute,getMessages)
router.post("/send/:id",protectRoute,sendMessage)




module.exports = router;