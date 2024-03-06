const mongoose =require('mongoose')
const {MONGODB_URI} = process.env

 const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = connectDB

