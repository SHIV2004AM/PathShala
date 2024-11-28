import mongoose from "mongoose";

mongoose.set('strictQuery' , false) ; 

const connectDB = async  () => {
try {
        const {connection} =  await mongoose.connect(process.env.MONGO_URI) 
    
    if(connection) {
        console.log(`Database Connected : ${connection.host} `);
    }
} catch (error) {
    console.log(error);
    process.exit(1) ; 
}
}

export default connectDB ; 