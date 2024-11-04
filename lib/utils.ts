import mongoose from "mongoose";
const MongoENV = process.env.MONGO;

// const connection : {isConnected? : any} = {}

export const connectDb = async() => {
  try {
    // if(connection.isConnected) {
    //     console.log("Using existing connection")
    //     return
    // }
    if(MongoENV) {
       const db =  await mongoose.connect(MongoENV);
      //  connection.isConnected = db.connections[0].readyState;
       console.log("Database connected!!!!")
    }
  } catch (error:any) {
    console.log(error)
    throw new Error(error)
  }
}