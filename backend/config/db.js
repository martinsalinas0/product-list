const mongoose = require('mongoose'); 

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); 
    console.log(`MongoDB connected. Connected too database: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`); 
    process.exit(1)
  }
}