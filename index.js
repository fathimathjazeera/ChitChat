require('dotenv').config()
const express =  require('express')

const connectDB = require('./src/config/db')
const authRoutes=require('./src/routes/authRoutes')

const app= express()
const PORT= process.env.PORT

app.use(express.json())
app.use("/api/auth",authRoutes)





app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is running at port ${PORT}`)
})