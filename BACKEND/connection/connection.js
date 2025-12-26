const mongoose =require("mongoose");


const conn=async()=>{
    try{
        await mongoose.connect(`${process.env.URL}`);
        console.log("connected to database");

    } catch(error){
        console.log(error)
    }
}

conn();