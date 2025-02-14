const express = require('express');

const  { router } = require('./Routes/routes')
const {ConnectDB} = require('./Config/db')


const cors = require('cors');

const app = express();

ConnectDB();


const port = 8000;

app.use(cors());

app.use(express.json());
app.use('/admin',router);








app.get('/',(req,res)=>{
    res.send('Admin Backend for Godaddy is Runing ');
})





app.listen(port,()=>{
     console.log("Admin Panel Start on Backend Port ",`${port}`);
})