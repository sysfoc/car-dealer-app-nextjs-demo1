import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to MongoDB");
    console.log(process.env.MONGODB_URI + "/cardealor");

    return;
  }
  await mongoose.connect(process.env.MONGODB_URI + "/cardealor", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(process.env.MONGODB_URI + "/cardealor");

  console.log("Connected to MongoDB");
};

export default connectDB;
