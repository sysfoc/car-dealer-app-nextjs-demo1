// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;
// const options = {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// };
// let client;
// ``;
// let clientPromise;

// if (!process.env.MONGODB_URI) {
//   throw new Error("Add Mongo URI to .env.local");
// }

// if (process.env.NODE_ENV === "development") {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// export default clientPromise;

//2

// import mongoose from "mongoose";

// const connectDB = async () => {
//   if (mongoose.connections[0].readyState) {
//     console.log("Already connected to MongoDB");
//     console.log(process.env.MONGODB_URI);

//     return;
//   }
//   await mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   console.log(process.env.MONGODB_URI);

//   console.log("Connected to MongoDB");
// };

// export default connectDB;
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log("Already connected to MongoDB");
      return;
    }

    const clientOptions = {
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
      },
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri, clientOptions);

    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectDB;
