require('dotenv').config();
const mongoose = require('mongoose');




async function ConnectDB(){    
    try{
        const response = await mongoose.connect("mongodb+srv://creditklick21:qKU0hw7Kt6lApIho@godaddylogin.05t78.mongodb.net/GODADDY_AUTH?retryWrites=true&w=majority&appName=GoDaddyLogin",{
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
