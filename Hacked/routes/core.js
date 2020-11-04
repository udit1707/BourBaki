const express = require('express');
const router = express.Router();
const coreControllers=require('../controllers/core');

router.post('/sendImageToFlask',coreControllers.postImg);


module.exports=router;