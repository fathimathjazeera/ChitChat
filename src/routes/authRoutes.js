const express = require('express')
const router = express.Router()

const {login,signUp} = require('../controllers/user')
const tryCatch= require('../middlewares/tryCatch')
router.post("/signup",tryCatch(signUp))
router.post('/login',login)

module.exports = router;