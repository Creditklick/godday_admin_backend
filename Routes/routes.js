const express = require('express');

const {authsignup , userAuth  ,allFolder , deleteById , updatePassword , updateFolderPassword , static_update} = require('./../controller/controller')

const router = express.Router();

router.post('/signup',authsignup);


router.get('/alluser',userAuth);



router.get('/allfolder',allFolder);



router.delete('/delete',deleteById);



router.patch('/access',updatePassword);



router.patch('/access/folder',updateFolderPassword);



router.get('/stat',static_update)


module.exports = {router};