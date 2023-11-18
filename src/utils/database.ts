import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URL!, {
      dbName: "thequotesgram",
    });

    isConnected = true;
  } catch (err) {
    console.log(err);
  }
};
