require('dotenv').config()
const express =  require('express')
const app= express()
const connectDB = require('./src/config/db')
const PORT= process.env.PORT



connectDB()
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})