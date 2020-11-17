const path=require('path');
const fs=require('fs');
const axios = require('axios').default;
var base64Img = require('base64-img');
// var latexToUnicode = require('latex-to-unicode');
var file_name,file_path;
require('dotenv').config();
//Receiving image from the app and sending to Flask.
exports.postComplex=async(req,res,next)=>{
    try{
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
                response2=await axios.post('https://hackflask-api.herokuapp.com/postComplex',data_to_flask,{
                    headers:{
                        "content-type": "application/json"
                        }
                    });
                if(!response2)
                throw error;
            }
            console.log(response2.data.data_result);
            let obje=JSON.parse(response2.data.data_result);
            clearFile(file_path);
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


exports.postBodmas=async(req,res,next)=>{
    try{
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
                response2=await axios.post('https://hackflask-api.herokuapp.com/postBodmas',data_to_flask,{
                    headers:{
                        "content-type": "application/json"
                        }
                    });
                if(!response2)
                throw error;
            }
            console.log(response2.data.data_result);
            clearFile(file_path);
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

exports.postEqSolve=async(req,res,next)=>{
    try{
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
                response2=await axios.post('https://hackflask-api.herokuapp.com/postEqSolve',data_to_flask,{
                    headers:{
                        "content-type": "application/json"
                        }
                    });
                if(!response2)
                throw error;
            }
            console.log(response2.data.data_result);
            clearFile(file_path);
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

exports.postCoordinate=async(req,res,next)=>{
    try{
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
                console.log(string_data);
                ///string_data=string_data.substring(1,string_data.length-1);
                console.log(typeof(string_data));
                console.log(string_data);
                let data_to_flask={
                    "text":string_data
                };
                response2=await axios.post('http://127.0.0.1:5000/postCoordinate',data_to_flask,{
                    headers:{
                        "content-type": "application/json"
                        }
                    });
                if(!response2)
                throw error;
            }
            console.log(response2.data.data_result);
            clearFile(file_path);
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

exports.postLinesCoordinate=async(req,res,next)=>{
    try{
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
                console.log(string_data);
                string_data=string_data.substring(2,string_data.length-2);
                console.log(typeof(string_data));
                console.log(string_data);
                let data_to_flask={
                    "text":string_data
                };
                response2=await axios.post('http://127.0.0.1:5000/postLinesCoordinate',data_to_flask,{
                    headers:{
                        "content-type": "application/json"
                        }
                    });
                if(!response2)
                throw error;
            }
            console.log(response2.data.data_result);
            clearFile(file_path);
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

exports.postCircleCoordinate=async(req,res,next)=>{
    try{
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
                console.log(string_data);
                string_data=string_data.substring(2,string_data.length-2);
                console.log(typeof(string_data));
                console.log(string_data);
                let data_to_flask={
                    "text":string_data
                };
                response2=await axios.post('http://127.0.0.1:5000/postCircleCoordinate',data_to_flask,{
                    headers:{
                        "content-type": "application/json"
                        }
                    });
                if(!response2)
                throw error;
            }
            console.log(response2.data.data_result);
            clearFile(file_path);
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

exports.postEllipseCoordinate=async(req,res,next)=>{
    try{
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
                console.log(string_data);
                string_data=string_data.substring(1,string_data.length-1);
                console.log(typeof(string_data));
                console.log(string_data);
                let data_to_flask={
                    "text":string_data
                };
                response2=await axios.post('http://127.0.0.1:5000/postEllipseCoordinate',data_to_flask,{
                    headers:{
                        "content-type": "application/json"
                        }
                    });
                if(!response2)
                throw error;
            }
            console.log(response2.data.data_result);
            clearFile(file_path);
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

exports.postCalculusDerivative=async(req,res,next)=>{
    try{
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
                console.log(string_data);
                string_data=string_data.substring(2,string_data.length-2);
                console.log(typeof(string_data));
                console.log(string_data);
                let data_to_flask={
                    "text":string_data
                };
                response2=await axios.post('http://127.0.0.1:5000/postCalculusDerivative',data_to_flask,{
                    headers:{
                        "content-type": "application/json"
                        }
                    });
                if(!response2)
                throw error;
            }
            console.log(response2.data.data_result);
            clearFile(file_path);
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

exports.postIndefIntegrals=async(req,res,next)=>{
    try{
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
                console.log(string_data);
                string_data=string_data.substring(2,string_data.length-2);
                console.log(typeof(string_data));
                console.log(string_data);
                let data_to_flask={
                    "text":string_data
                };
                response2=await axios.post('http://127.0.0.1:5000/postIndefIntegrals',data_to_flask,{
                    headers:{
                        "content-type": "application/json"
                        }
                    });
                if(!response2)
                throw error;
            }
            console.log(response2.data.data_result);
            clearFile(file_path);
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

exports.postDefIntegrals=async(req,res,next)=>{
    try{
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
                console.log(string_data);
                string_data=string_data.substring(2,string_data.length-2);
                console.log(typeof(string_data));
                console.log(string_data);
                let data_to_flask={
                    "text":string_data
                };
                response2=await axios.post('http://127.0.0.1:5000/postDefIntegrals',data_to_flask,{
                    headers:{
                        "content-type": "application/json"
                        }
                    });
                if(!response2)
                throw error;
            }
            console.log(response2.data.data_result);
            clearFile(file_path);
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

exports.postDoubleIntegrals=async(req,res,next)=>{
    try{
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
                console.log(string_data);
                string_data=string_data.substring(2,string_data.length-2);
                console.log(typeof(string_data));
                console.log(string_data);
                let data_to_flask={
                    "text":string_data
                };
                response2=await axios.post('http://127.0.0.1:5000/postDoubleIntegrals',data_to_flask,{
                    headers:{
                        "content-type": "application/json"
                        }
                    });
                if(!response2)
                throw error;
            }
            console.log(response2.data.data_result);
            clearFile(file_path);
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


const clearFile = filePath => {
    filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, err => console.log(err));
}