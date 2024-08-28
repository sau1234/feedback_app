import mongoose from 'mongoose'

 
type ConnectionObject = {      // database connection type Number hai
    isConnected?:Number
}

const connection : ConnectionObject = {}

async function dbConnect(): Promise<void> {    // promise is data types 
    if(connection.isConnected){
        console.log("Already connected to database");
        return
    }
  
    try {
           const db = await mongoose.connect(process.env.MONGODB_URI || "", {})
        //    console.log(db);
           connection.isConnected = db.connections[0].readyState // connections array ka first element ready state hai jo Number hai
           // HW db.connections & db ko console.log kar dekho 
        //    console.log(db.connections)
           console.log("database is connected successfully")
    } catch (error) {
           console.log("database connection is failed", error)
           process.exit(1)    // database ko gracefully band karna hai
    }
}


export default dbConnect;