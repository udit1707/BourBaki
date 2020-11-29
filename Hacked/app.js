const path=require('path');
const fs=require('fs');
const multer=require('multer');
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const coreRoutes=require('./routes/core');

const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
      
      if(file.fieldname==='image')
      {
        fs.exists(path.join(__dirname+'/ImageImport'),exists=>{
          if(!exists)
          {
            fs.mkdir(path.join(__dirname+'/ImageImport'),err=>{
              if(err)
              {
                res.status(404).json({message:"Folder creation failed"});
              }
           });
          }
          cb(null,'ImageImport');
        });
      }
     },
    filename:(req,file,cb)=>{
      // let name=new Date().toISOString();
      // let name1=name.replace(/:/g,'_');
      // name=name1.replace(/\./g,'-');
      cb(null,new Date().toISOString().replace(/:/g, '-') +'-'+file.originalname);
    }
  });

  const fileFilter=(req,file,cb)=>{
   if(file.fieldname==='image')
   {
    if(file.mimetype==='image/png' || file.mimetype === 'image/jpg' || file.mimetype ==='image/jpeg')
    {
         cb(null,true);
    }else{
         cb(new Error('The formats allowed are .png , .jpg and .jpeg'));
    }
   }
  }


app.use(bodyParser.json());

//Multer middleware
app.use(multer({ storage: fileStorage,fileFilter:fileFilter}).fields([{name:'image'}]));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

  app.use('/core',coreRoutes);
  
  //middleware to handle exceptions
  app.use((error,req,res,next)=>{
    console.log(error);
    const status=error.statusCode||500;
    const message=error.message;
    const data=error.data;
    res.status(status).json({err_message:message,data:data,status_code:status});
  });

  
  app.listen(process.env.PORT || 5001,async()=>{
      console.log("App Server started!");
  });
  



