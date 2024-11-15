import mongoose from "mongoose";
import dotenv from "dotenv";

const connectToMongoDB = async () => {
	mongoose.connect('mongodb+srv://shashankkumar1117:CoNqHHWi5bdtf0Iw@cluster0.tauyx.mongodb.net/chatApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

};

export default connectToMongoDB;
