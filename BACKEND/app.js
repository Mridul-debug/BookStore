const express =require("express");
const app=express();
require ("dotenv").config();
require("./connection/connection.js")
const cors=require("cors")


const user=require("./routes/user.js")
const book=require("./routes/book.js")
const cart=require("./routes/cart.js")
const favorite=require("./routes/favourite.js")
const order=require("./routes/order.js")

app.use(cors())
app.use(express.json())
//routes
app.use("/api/v1",user)
app.use("/api/v1",book)
app.use("/api/v1",cart)
app.use("/api/v1",favorite)
app.use("/api/v1",order)


//creating port
app.listen(process.env.PORT,()=>{
    console.log(`server started${process.env.PORT}`);
});