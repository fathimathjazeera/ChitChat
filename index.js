require('dotenv').config()
const express =  require('express')
const cookieParser= require('cookie-parser')
const connectDB = require('./src/config/db')
const authRoutes=require('./src/routes/authRoutes')
const messageRoutes= require('./src/routes/messageRoutes')
const app= express()
const PORT= process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/messages", messageRoutes)



app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is running at port ${PORT}`)
})