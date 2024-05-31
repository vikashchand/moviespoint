const dotenv = require('dotenv');
dotenv.config();


const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;


const connectDB = async () => {
    try {   
        await mongoose.connect("mongodb+srv://piyush09:3btGczX64LSqndDm@cluster0.1bqc8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" ,
         {dbName: "PiyushMovies" });
        // await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;




