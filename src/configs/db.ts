import mongoose from "mongoose";


export const connectDB=async():Promise<void>=>{
try {    
    mongoose.connection.on('connected',()=> {
        console.log('Database Connected')
    })

await mongoose.connect(`${process.env.MONGODB_URI}/blogger`)

} catch (error) {
   
    if (error instanceof Error) console.log(error.message);
    
}
}