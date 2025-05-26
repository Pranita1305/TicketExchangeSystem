//connect mongodb and give the connection object

const mongoose=require("mongoose");

const connectDB=async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });//uri of db in environment variable

        console.log("Successful database connection");
    }catch(error/*err*/){
        console.log("Failed to connect to database");
        //console.error(err.message); process.exit(1);

        process.exit()
    }
};

module.exports=connectDB;