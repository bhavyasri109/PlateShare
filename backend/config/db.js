// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI not set');
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
