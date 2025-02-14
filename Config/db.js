require('dotenv').config();
const mongoose = require('mongoose');




async function ConnectDB(){    
    try{
        const response = await mongoose.connect(process.env.MONGODB_URL,{
          useNewUrlParser : true,
          useUnifiedTopology : true
        });


        if(response){
          console.log("MangoDB Successfully",response.connection.host);
        }
   }
   catch(err){
       console.log("Mangodb not connected",err);
   }



}








module.exports = {ConnectDB}