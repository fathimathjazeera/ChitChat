const express = require('express')
const router = express.Router()
const tryCatch= require('../middlewares/tryCatch')
const protectRoute= require('../middlewares/protectRoute')
const {sendMessage} = require('../controllers/message')
router.post("/send/:id",protectRoute,tryCatch(sendMessage))





module.exports = router;