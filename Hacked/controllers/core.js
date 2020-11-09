const axios = require('axios').default;
var base64Img = require('base64-img');
var file_name,file_path;

//Receiving image from the app and sending to Flask.
exports.postImg=async(req,res,next)=>{
    try{
            if (!req.files||(req.files && !req.files.image)) 
            {
                const error = new Error('No Image provided.');
                error.statusCode = 422;
                throw error;
            }
            let response2;
            file_name=req.files.image[0].filename;
            file_path=req.files.image[0].path;
            var data = base64Img.base64Sync(file_path); //img to base64 data
            let config={
                headers:{
                    "content-type": "application/json",
                    "app_id": process.env.API_ID,
                    "app_key": process.env.API_KEY
                }
            };
            let imgData={
                "src": data,
                "formats": ["text", "data", "html"],
                "data_options": {
                    "include_asciimath": true,
                    "include_latex": true
                }
            };
            const response=await axios.post('https://api.mathpix.com/v3/text',imgData,config);
            if(!response)
            {
                throw error;
            }
            else
            {
                console.log(response.data.text);
                let data_to_flask={
                    "text":response.data.text
                };
                response2=await axios.post('http://127.0.0.1:5005/postdata',data_to_flask,{
                    headers:{
                        "content-type": "application/json"
                    }
                });
                if(!response2)
                throw error;
            }
            //var form=new FormData();
            // fs.readFile(file_path,async (err,image)=>{
            //     if(err)
            //     res.status(404).json({message:"Image Read Failed"});
            //     form.append('image',image,{
            //         filepath: file_path,
            //         contentType: 'image/jpeg',
            //     });
            //     console.log("Sending....");
            //     axios.post('https://api.mathpix.com/v3/text', form, {
            //         headers: form.getHeaders(),
            //       }).then(response => {
            //        // console.log('success! ', response.status, response.statusText, response.headers, typeof response.data, Object.prototype.toString.apply(response.data));
            //        console.log(response);  
            //     }).catch(err => {
            //         console.log(err);
            //       });
            //  }); 
            res.status(200).json({message:"Success",dataFromFlask:response2.data});               
    }
    catch(err){
        if (!err.statusCode)    
        {
            err.statusCode = 500;
        }
        next(err);
    }
}

