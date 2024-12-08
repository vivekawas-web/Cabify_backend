const mongoose =require('mongoose');

function connetToDb(){
    mongoose.connect(process.env.DBURL).then(()=>console.log("MongoDB connection successful"))
    .catch((err) => console.error("MongoDB connection error:", err));
}

module.exports= connetToDb;