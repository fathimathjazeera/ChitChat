const express = require('express')
const router = express.Router()
const {login,signUp,logout} = require('../controllers/user')
const tryCatch= require('../middlewares/tryCatch')


router.post("/signup",tryCatch(signUp))
router.post('/login',tryCatch(login) )
router.post('/logout', tryCatch(logout))




module.exports = router;