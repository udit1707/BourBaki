const axios = require('axios').default;
var base64Img = require('base64-img');
// var latexToUnicode = require('latex-to-unicode');
var file_name,file_path;
require('dotenv').config();
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
            let imgData={"src": data,"formats": ["text", "data", "html"],"data_options": {"include_asciimath": true, "include_latex": true}};
            const response=await axios.post('https://api.mathpix.com/v3/text',imgData,config);
            if(!response)
            {
                throw error;
            }
            else
            {
                let string_data=response.data.text;
                string_data=string_data.substring(2,string_data.length-2);
                let data_to_flask={
                    "text":string_data
                };
                response2=await axios.post('http://127.0.0.1:5005/postdata',data_to_flask,{
                    headers:{
                        "content-type": "application/json"
                        }
                    });
                if(!response2)
                throw error;
            }
            console.log(response2.data.data_result);
            let obje=JSON.parse(response2.data.data_result);
            res.status(200).json(obje);               
    }
    catch(err){
        if (!err.statusCode)    
        {
            err.statusCode = 500;
        }
        next(err);
    }
}

