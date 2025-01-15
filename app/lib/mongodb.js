import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to MongoDB");
    console.log(process.env.MONGODB_URI);

    return;
  }
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(process.env.MONGODB_URI);

  console.log("Connected to MongoDB");
};

export default connectDB;
