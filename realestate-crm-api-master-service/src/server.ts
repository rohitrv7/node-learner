import mongoose from "mongoose";
import { app } from "./app.js";
import { connectToDB } from "./config/db.js";
import { accessLogger } from "./utils/logger.js";
const db = mongoose.connection

const PORT = process.env.PORT || 5001 // Fallback to 5000 if PORT is not defined 
app.listen(PORT,async()=>{
    await connectToDB();
    accessLogger.info(`Master Services listening on ${PORT}`)
});

db.on("error",(error)=>{
    console.log(`MongoDB connection error:`, error)
})

db.once("open",()=>{
    console.log("Connected to MongoDb")
});

db.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
    console.log("exiting the process");
    process.exit(1);
  });

db.on("connected", () => {
    console.log("connected to db!");
});



