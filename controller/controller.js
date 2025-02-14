
const jwt = require('jsonwebtoken'); // For token generation
const bcrypt = require('bcryptjs'); // For password hashing
const { User } = require('./../models/userSchema'); // Import the User model
const {  Folder } =  require('./../models/folderSchema')

const mongoose = require('mongoose');


// User Signup Function
const authsignup = async (req, res) => {
  try {
    console.log('Call to authsignup');

    const { name, email, password } = req.body;
    console.log("Received:", name, email, password);

     console.log("Name is ",name , "email is ",email,"and Password is ",password);





    // Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // If user creation is successful, return the user's data
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400).json({ message: 'Failed to create user' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};




const userAuth = async (req,res)=>{
     try{
             const getAllUser = await User.find();
             res.json(getAllUser);
            // res.send(getAllUser);

     }
     catch(err){
          res.status(401).json({message : "Failed to get all user data"});

     }
}





const allFolder = async (req,res)=>{
    try{
          const allFolderData = await Folder.find();
          res.json(allFolderData);
    }
    catch(err){
         res.status(401).json({message : "Falied to get all folderdata"});

    }
}



// const deleteById = async(req,res)=>{
  

//      try{



//        const {id} =  req.params;
//        console.log("Call delete api ",id);
//        if(!id){
//           return res.status(400).json({message : "User Id is Required"});
//        }

//        const result = await User.destroy({where : {id}});

//        if(result){
//         return res.status(201).json({message : "User delete successfully"});
//        }
//        else{
//         return res.status(404).json({message : "User Not Found"});
//        }


//      }
//      catch(err){
//         return res.status(500).json({message : "Falid to delete User"});
//      }


// }




const deleteById = async (req, res) => {
    try {
        const {id} = req.body;
        console.log("Call delete API, ID:", id);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error("Failed to delete user:", err);
        return res.status(500).json({ message: "Failed to delete user" });
    }
};





const updatePassword = async (req,res)=>{
     try{
           const {email , newpassword} = req.body;

           if(!email || !newpassword){
               return res.status(400).json({success : false , message : "Password is required"});
           }

          const user = await User.findOne({email});
         
          if(!user){
              return res.status(404).json({success : false , message : "User Not Found"})
          }
           
          const salt = 10;
          const hashedpassword = await bcrypt.hash(newpassword,salt);
          user.password = hashedpassword;
          await user.save();
          res.status(201).json({success: true , message : "Password update successfully"});
         // res.status(200).json({ message: "Password updated successfully" });
     }
     catch(err){
            console.log("Auth Password Not Updated");
            res.status(500).json({success : false , message : "Server Error in auth password update"});
     }
}




const updateFolderPassword = async (req,res)=>{


  try{
       const {foldername,folderpassword} = req.body;


       console.log("Folder name is ",foldername);
       console.log("Folder password is ",folderpassword);

       if(!foldername || !folderpassword){
            res.status(400).json({success : false,message : "Password is Required"});
       }

       const getfolder = await Folder.findOne({foldername});

       if(!getfolder){
           res.status(404).json({success : false , message : "Folder Not Found"});
       }

       getfolder.folderpassword = folderpassword;
       await getfolder.save();
       res.status(201).json({success : true , message : "Folder Password Updated"});



  }
  catch(error){
    res.status(500).json({success : false , message  : "Server Error in updating folder password"})

  }
         
}




const static_update = async (req,res)=>{
    try{
            const totalUsers = await User.countDocuments();
            const totalFolders = await Folder.countDocuments();


            console.log("Total Users is ",totalUsers);
            console.log("Total Folder is ",totalFolders);

            let LatestFolder = null;
            let LatestUser = null;
            
            // Fetch the latest folder if totalFolders exists
            if (totalFolders > 0) {
                LatestFolder = await Folder.findOne().sort({ createdAt: -1 }).limit(1);
            }
            
            // Fetch the latest user if totalUsers exists
            if (totalUsers > 0) {
                LatestUser = await User.findOne().sort({ createdAt: -1 }).limit(1);
            }
            
            // Send response with properly formatted JSON
            res.status(201).json({
                success: true,
                message: "Fetched latest statistics successfully",
                totalUsers,
                totalFolders,
                LatestUser,
                LatestFolder
            });
        
    }
    catch(err){
          res.status(500).json({success : false , message : "Server Error in Geting Stats of folder and User"})
    }
}




module.exports = {authsignup  , userAuth , allFolder , deleteById , updatePassword , updateFolderPassword , static_update}