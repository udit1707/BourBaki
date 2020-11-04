const axios = require('axios').default;
var FormData = require('form-data');
var fs = require('fs');
var file_name,file_path;

//Receiving image from the app and sending to Flask.
exports.postImg=(req,res,next)=>{
    try{
        if (!req.files||(req.files && !req.files.image)) 
        {
            const error = new Error('No Image provided.');
            error.statusCode = 422;
            throw error;
        }
            file_name=req.files.image[0].filename;
            file_path=req.files.image[0].path;
            var form=new FormData();
            fs.readFile(file_path,async (err,image)=>{
                if(err)
                res.status(404).json({message:"Image Read Failed"});
                form.append('image',image,{
                    filepath: file_path,
                    contentType: 'image/jpeg',
                });
                console.log("Sending....");
                axios.post('http://127.0.0.1:5005/postdata', form, {
                    headers: form.getHeaders(),
                  }).then(response => {
                   // console.log('success! ', response.status, response.statusText, response.headers, typeof response.data, Object.prototype.toString.apply(response.data));
                   console.log(response);  
                }).catch(err => {
                    console.log(err);
                  });
             }); 
            res.status(200).json({message:"Success"});               
    }
    catch(err){
        if (!err.statusCode)    
        {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getData=async(req,res,next)=>{
    try
    {
       const response=await axios.get(
           //url
       );
       if(!response)
       {
        const error = new Error('No Data provided.');
        error.statusCode = 422;
        throw error;
       }
       res.status(200).json({message:"Data sent",payload:response});
    }
    catch(err){
        if (!err.statusCode)    
        {
            err.statusCode = 500;
        }
        next(err);
    }
}

//Enpoint to send the image to flask server
/*exports.sendToFlask=async(req,res,next)=>{
    const file_name=file_name;
    const file_path=file_path;
    var form=new FormData();

    form.append('image_file',fs.createReadStream({$file_path}));
    try
    {
            axios.post(
            //Flask GET IMAGE API_URL
            )
        const downloadableFile = `${__dirname}/../ImageImport/${file_name}`;
        res.download(downloadableFile);
    }
    catch(err)
    {
      if (!err.statusCode) 
      {
        err.statusCode = 500;
      }
      next(err);
    }
}*/
