const path = require('path');
const fs = require('fs');
const axios = require('axios').default;
var base64Img = require('base64-img');
var file_name, file_path;
require('dotenv').config();


/*We are Pipelining data via Axios calls to PYTHON Flask RESTful services.
Receiving image from the client and sending the latex string to python script in every endpoint below.
Sending JSONIFIED data back to client
*/

//Calculating Complex Number Problems
exports.postComplex = async (req, res, next) => {
    try {
        let response2;
        file_name = req.files.image[0].filename;
        file_path = req.files.image[0].path;
        var data = base64Img.base64Sync(file_path); //img to base64 data
        let config = {
            headers: {
                "content-type": "application/json",
                "app_id": process.env.API_ID,
                "app_key": process.env.API_KEY
            }
        };
        let imgData = { "src": data, "formats": ["text", "data", "html"], "data_options": { "include_asciimath": true, "include_latex": true } };
        const response = await axios.post('https://api.mathpix.com/v3/text', imgData, config);
        if (!response) {
            throw error;
        }
        else {
            let string_data = response.data.text;
            string_data = string_data.substring(2, string_data.length - 2);
            let data_to_flask = {
                "text": string_data
            };
            try {
                response2 = await axios.post('https://hackflask-api.herokuapp.com/postComplex', data_to_flask, {
                    headers: {
                        "content-type": "application/json"
                    }
                });
            }
            catch (err) {
                const error = new Error("image mismatch_Error. Select the correct Problem type");
                error.statusCode = 400;
                throw error;
            }
        }
        let obje = JSON.parse(response2.data.data_result);
        clearFile(file_path);
        res.status(200).json(obje);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

//Calculating BODMAS expressions
exports.postBodmas = async (req, res, next) => {
    try {
        let response2;
        file_name = req.files.image[0].filename;
        file_path = req.files.image[0].path;
        var data = base64Img.base64Sync(file_path); //img to base64 data
        let config = {
            headers: {
                "content-type": "application/json",
                "app_id": process.env.API_ID,
                "app_key": process.env.API_KEY
            }
        };
        let imgData = { "src": data, "formats": ["text", "data", "html"], "data_options": { "include_asciimath": true, "include_latex": true } };
        const response = await axios.post('https://api.mathpix.com/v3/text', imgData, config);
        if (!response) {
            throw error;
        }
        else {
            let string_data = response.data.text;
            string_data = string_data.substring(2, string_data.length - 2);
            let data_to_flask = {
                "text": string_data
            };
            try {
                response2 = await axios.post('https://hackflask-api.herokuapp.com/postBodmas', data_to_flask, {
                    headers: {
                        "content-type": "application/json"
                    }
                });
            }
            catch (err) {
                const error = new Error("image mismatch_Error. Select the correct Problem type");
                error.statusCode = 400;
                throw error;
            }
        }
        //console.log(response2.data.data_result);
        clearFile(file_path);
        let obje = JSON.parse(response2.data.data_result);
        res.status(200).json(obje);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

//Rectifying BODMAS results
exports.postBodmasChecker = async (req, res, next) => {
    try {
        let response2;
        file_name = req.files.image[0].filename;
        file_path = req.files.image[0].path;
        var data = base64Img.base64Sync(file_path); //img to base64 data
        let config = {
            headers: {
                "content-type": "application/json",
                "app_id": process.env.API_ID,
                "app_key": process.env.API_KEY
            }
        };
        let imgData = { "src": data, "formats": ["text", "data", "html"], "data_options": { "include_asciimath": true, "include_latex": true } };
        const response = await axios.post('https://api.mathpix.com/v3/text', imgData, config);
        if (!response) {
            throw error;
        }
        else {
            let string_data = response.data.text;
            string_data = string_data.substring(2, string_data.length - 2);
            let data_to_flask = {
                "text": string_data
            };
            try {
                response2 = await axios.post('http://127.0.0.1:5000/postBodmasChecker', data_to_flask, {
                    headers: {
                        "content-type": "application/json"
                    }
                });
            }
            catch (err) {
                const error = new Error("image mismatch_Error. Select the correct Problem type");
                error.statusCode = 400;
                throw error;
            }
        }
        clearFile(file_path);
        let obje = JSON.parse(response2.data.data_result);
        res.status(200).json(obje);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

//Solving all types of equations- Linear to Polynomial
exports.postEqSolve = async (req, res, next) => {
    try {
        let response2;
        file_name = req.files.image[0].filename;
        file_path = req.files.image[0].path;
        var data = base64Img.base64Sync(file_path); //img to base64 data
        let config = {
            headers: {
                "content-type": "application/json",
                "app_id": process.env.API_ID,
                "app_key": process.env.API_KEY
            }
        };
        let imgData = { "src": data, "formats": ["text", "data", "html"], "data_options": { "include_asciimath": true, "include_latex": true } };
        const response = await axios.post('https://api.mathpix.com/v3/text', imgData, config);
        if (!response) {
            throw error;
        }
        else {
            let string_data = response.data.text;
            string_data = string_data.substring(2, string_data.length - 2);
            let data_to_flask = {
                "text": string_data
            };
            try {
                response2 = await axios.post('https://hackflask-api.herokuapp.com/postEqSolve', data_to_flask, {
                    headers: {
                        "content-type": "application/json"
                    }
                });
            }
            catch (err) {
                const error = new Error("image mismatch_Error. Select the correct Problem type");
                error.statusCode = 400;
                throw error;
            }
        }
        //console.log(response2.data.data_result);
        clearFile(file_path);
        let obje = JSON.parse(response2.data.data_result);
        res.status(200).json(obje);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

//Evaluating Points Coordinates 
exports.postCoordinate = async (req, res, next) => {
    try {
        let response2;
        file_name = req.files.image[0].filename;
        file_path = req.files.image[0].path;
        var data = base64Img.base64Sync(file_path); //img to base64 data
        let config = {
            headers: {
                "content-type": "application/json",
                "app_id": process.env.API_ID,
                "app_key": process.env.API_KEY
            }
        };
        let imgData = { "src": data, "formats": ["text", "data", "html"], "data_options": { "include_asciimath": true, "include_latex": true } };
        const response = await axios.post('https://api.mathpix.com/v3/text', imgData, config);
        if (!response) {
            throw error;
        }
        else {
            let string_data = response.data.text;
            console.log(string_data);
            ///string_data=string_data.substring(1,string_data.length-1);
            console.log(typeof (string_data));
            console.log(string_data);
            let data_to_flask = {
                "text": string_data
            };
            response2 = await axios.post('http://127.0.0.1:5000/postCoordinate', data_to_flask, {
                headers: {
                    "content-type": "application/json"
                }
            });
            if (!response2)
                throw error;
        }
        //console.log(response2.data.data_result);
        clearFile(file_path);
        let obje = JSON.parse(response2.data.data_result);
        res.status(200).json(obje);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

//Evaluating lines coordinates
exports.postLinesCoordinate = async (req, res, next) => {
    try {
        let response2;
        file_name = req.files.image[0].filename;
        file_path = req.files.image[0].path;
        var data = base64Img.base64Sync(file_path); //img to base64 data
        let config = {
            headers: {
                "content-type": "application/json",
                "app_id": process.env.API_ID,
                "app_key": process.env.API_KEY
            }
        };
        let imgData = { "src": data, "formats": ["text", "data", "html"], "data_options": { "include_asciimath": true, "include_latex": true } };
        const response = await axios.post('https://api.mathpix.com/v3/text', imgData, config);
        if (!response) {
            throw error;
        }
        else {
            let string_data = response.data.text;
            console.log(string_data);
            string_data = string_data.substring(2, string_data.length - 2);
            console.log(typeof (string_data));
            console.log(string_data);
            let data_to_flask = {
                "text": string_data
            };
            try {
                response2 = await axios.post('http://127.0.0.1:5000/postLinesCoordinate', data_to_flask, {
                    headers: {
                        "content-type": "application/json"
                    }
                });
            }
            catch (err) {
                const error = new Error("image mismatch_Error. Select the correct Problem type");
                error.statusCode = 400;
                throw error;
            }
        }
        //console.log(response2.data.data_result);
        clearFile(file_path);
        let obje = JSON.parse(response2.data.data_result);
        res.status(200).json(obje);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

//evaluating circle coordinates
exports.postCircleCoordinate = async (req, res, next) => {
    try {
        let response2;
        file_name = req.files.image[0].filename;
        file_path = req.files.image[0].path;
        var data = base64Img.base64Sync(file_path); //img to base64 data
        let config = {
            headers: {
                "content-type": "application/json",
                "app_id": process.env.API_ID,
                "app_key": process.env.API_KEY
            }
        };
        let imgData = { "src": data, "formats": ["text", "data", "html"], "data_options": { "include_asciimath": true, "include_latex": true } };
        const response = await axios.post('https://api.mathpix.com/v3/text', imgData, config);
        if (!response) {
            throw error;
        }
        else {
            let string_data = response.data.text;
            console.log(string_data);
            string_data = string_data.substring(2, string_data.length - 2);
            console.log(typeof (string_data));
            console.log(string_data);
            let data_to_flask = {
                "text": string_data
            };
            try {
                response2 = await axios.post('http://127.0.0.1:5000/postCircleCoordinate', data_to_flask, {
                    headers: {
                        "content-type": "application/json"
                    }
                });
            }
            catch (err) {
                const error = new Error("image mismatch_Error. Select the correct Problem type");
                error.statusCode = 400;
                throw error;
            }
        }
        //console.log(response2.data.data_result);
        clearFile(file_path);
        let obje = JSON.parse(response2.data.data_result);
        res.status(200).json(obje);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

//evaluating ellipse coordinates
exports.postEllipseCoordinate = async (req, res, next) => {
    try {
        let response2;
        file_name = req.files.image[0].filename;
        file_path = req.files.image[0].path;
        var data = base64Img.base64Sync(file_path); //img to base64 data
        let config = {
            headers: {
                "content-type": "application/json",
                "app_id": process.env.API_ID,
                "app_key": process.env.API_KEY
            }
        };
        let imgData = { "src": data, "formats": ["text", "data", "html"], "data_options": { "include_asciimath": true, "include_latex": true } };
        const response = await axios.post('https://api.mathpix.com/v3/text', imgData, config);
        if (!response) {
            throw error;
        }
        else {
            let string_data = response.data.text;
            console.log(string_data);
            string_data = string_data.substring(1, string_data.length - 1);
            console.log(typeof (string_data));
            console.log(string_data);
            let data_to_flask = {
                "text": string_data
            };
            try {
                response2 = await axios.post('http://127.0.0.1:5000/postEllipseCoordinate', data_to_flask, {
                    headers: {
                        "content-type": "application/json"
                    }
                });
            }
            catch (err) {
                const error = new Error("image mismatch_Error. Select the correct Problem type");
                error.statusCode = 400;
                throw error;
            }
        }
        clearFile(file_path);
        let obje = JSON.parse(response2.data.data_result);
        res.status(200).json(obje);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

//evaluating differentiation
exports.postCalculusDerivative = async (req, res, next) => {
    try {
        let response2;
        file_name = req.files.image[0].filename;
        file_path = req.files.image[0].path;
        var data = base64Img.base64Sync(file_path); //img to base64 data
        let config = {
            headers: {
                "content-type": "application/json",
                "app_id": process.env.API_ID,
                "app_key": process.env.API_KEY
            }
        };
        let imgData = { "src": data, "formats": ["text", "data", "html"], "data_options": { "include_asciimath": true, "include_latex": true } };
        const response = await axios.post('https://api.mathpix.com/v3/text', imgData, config);
        if (!response) {
            throw error;
        }
        else {
            let string_data = response.data.text;
            console.log(string_data);
            string_data = string_data.substring(2, string_data.length - 2);
            console.log(typeof (string_data));
            console.log(string_data);
            let data_to_flask = {
                "text": string_data
            };
            try {
                response2 = await axios.post('http://127.0.0.1:5000/postCalculusDerivative', data_to_flask, {
                    headers: {
                        "content-type": "application/json"
                    }
                });
            }
            catch (err) {
                const error = new Error("image mismatch_Error. Select the correct Problem type");
                error.statusCode = 400;
                throw error;
            }
        }
        //console.log(response2.data.data_result);
        clearFile(file_path);
        let obje = JSON.parse(response2.data.data_result);
        res.status(200).json(obje);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

//Evaluating indefinite Integrals
exports.postIndefIntegrals = async (req, res, next) => {
    try {
        let response2;
        file_name = req.files.image[0].filename;
        file_path = req.files.image[0].path;
        var data = base64Img.base64Sync(file_path); //img to base64 data
        let config = {
            headers: {
                "content-type": "application/json",
                "app_id": process.env.API_ID,
                "app_key": process.env.API_KEY
            }
        };
        let imgData = { "src": data, "formats": ["text", "data", "html"], "data_options": { "include_asciimath": true, "include_latex": true } };
        const response = await axios.post('https://api.mathpix.com/v3/text', imgData, config);
        if (!response) {
            throw error;
        }
        else {
            let string_data = response.data.text;
            console.log(string_data);
            string_data = string_data.substring(2, string_data.length - 2);
            console.log(typeof (string_data));
            console.log(string_data);
            let data_to_flask = {
                "text": string_data
            };
            try {
                response2 = await axios.post('http://127.0.0.1:5000/postIndefIntegrals', data_to_flask, {
                    headers: {
                        "content-type": "application/json"
                    }
                });
            }
            catch (err) {
                const error = new Error("image mismatch_Error. Select the correct Problem type");
                error.statusCode = 400;
                throw error;
            }
        }
        //console.log(response2.data.data_result);
        clearFile(file_path);
        let obje = JSON.parse(response2.data.data_result);
        res.status(200).json(obje);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

//evaluating definite integrals
exports.postDefIntegrals = async (req, res, next) => {
    try {
        let response2;
        file_name = req.files.image[0].filename;
        file_path = req.files.image[0].path;
        var data = base64Img.base64Sync(file_path); //img to base64 data
        let config = {
            headers: {
                "content-type": "application/json",
                "app_id": process.env.API_ID,
                "app_key": process.env.API_KEY
            }
        };
        let imgData = { "src": data, "formats": ["text", "data", "html"], "data_options": { "include_asciimath": true, "include_latex": true } };
        const response = await axios.post('https://api.mathpix.com/v3/text', imgData, config);
        if (!response) {
            throw error;
        }
        else {
            let string_data = response.data.text;
            console.log(string_data);
            string_data = string_data.substring(2, string_data.length - 2);
            console.log(typeof (string_data));
            console.log(string_data);
            let data_to_flask = {
                "text": string_data
            };
            try {
                response2 = await axios.post('http://127.0.0.1:5000/postDefIntegrals', data_to_flask, {
                    headers: {
                        "content-type": "application/json"
                    }
                });
            }
            catch (err) {
                const error = new Error("image mismatch_Error. Select the correct Problem type");
                error.statusCode = 400;
                throw error;
            }
        }
        //console.log(response2.data.data_result);
        clearFile(file_path);
        let obje = JSON.parse(response2.data.data_result);
        res.status(200).json(obje);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

//evaluating double integrals
exports.postDoubleIntegrals = async (req, res, next) => {
    try {
        let response2;
        file_name = req.files.image[0].filename;
        file_path = req.files.image[0].path;
        var data = base64Img.base64Sync(file_path); //img to base64 data
        let config = {
            headers: {
                "content-type": "application/json",
                "app_id": process.env.API_ID,
                "app_key": process.env.API_KEY
            }
        };
        let imgData = { "src": data, "formats": ["text", "data", "html"], "data_options": { "include_asciimath": true, "include_latex": true } };
        const response = await axios.post('https://api.mathpix.com/v3/text', imgData, config);
        if (!response) {
            throw error;
        }
        else {
            let string_data = response.data.text;
            console.log(string_data);
            string_data = string_data.substring(2, string_data.length - 2);
            console.log(typeof (string_data));
            console.log(string_data);
            let data_to_flask = {
                "text": string_data
            };
            try {
                response2 = await axios.post('http://127.0.0.1:5000/postDoubleIntegrals', data_to_flask, {
                    headers: {
                        "content-type": "application/json"
                    }
                });
            }
            catch (err) {
                const error = new Error("image mismatch_Error. Select the correct Problem type");
                error.statusCode = 400;
                throw error;
            }
        }
        //console.log(response2.data.data_result);
        clearFile(file_path);
        let obje = JSON.parse(response2.data.data_result);
        res.status(200).json(obje);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

//evaluating triple integrals
exports.postTripleIntegrals = async (req, res, next) => {
    try {
        let response2;
        file_name = req.files.image[0].filename;
        file_path = req.files.image[0].path;
        var data = base64Img.base64Sync(file_path); //img to base64 data
        let config = {
            headers: {
                "content-type": "application/json",
                "app_id": process.env.API_ID,
                "app_key": process.env.API_KEY
            }
        };
        let imgData = { "src": data, "formats": ["text", "data", "html"], "data_options": { "include_asciimath": true, "include_latex": true } };
        const response = await axios.post('https://api.mathpix.com/v3/text', imgData, config);
        if (!response) {
            throw error;
        }
        else {
            let string_data = response.data.text;
            console.log(string_data);
            string_data = string_data.substring(2, string_data.length - 2);
            console.log(typeof (string_data));
            console.log(string_data);
            let data_to_flask = {
                "text": string_data
            };
            try {
                response2 = await axios.post('http://127.0.0.1:5000/postTripleIntegrals', data_to_flask, {
                    headers: {
                        "content-type": "application/json"
                    }
                });
            }
            catch (err) {
                const error = new Error("image mismatch_Error. Select the correct Problem type");
                error.statusCode = 400;
                throw error;
            }
        }
        //console.log(response2.data.data_result);
        clearFile(file_path);
        let obje = JSON.parse(response2.data.data_result);
        res.status(200).json(obje);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

//evaluating limit problems
exports.postCalculusLimits = async (req, res, next) => {
    try {
        let response2;
        file_name = req.files.image[0].filename;
        file_path = req.files.image[0].path;
        var data = base64Img.base64Sync(file_path); //img to base64 data
        let config = {
            headers: {
                "content-type": "application/json",
                "app_id": process.env.API_ID,
                "app_key": process.env.API_KEY
            }
        };
        let imgData = { "src": data, "formats": ["text", "data", "html"], "data_options": { "include_asciimath": true, "include_latex": true } };
        const response = await axios.post('https://api.mathpix.com/v3/text', imgData, config);
        if (!response) {
            throw error;
        }
        else {
            let string_data = response.data.text;
            console.log(string_data);
            string_data = string_data.substring(2, string_data.length - 2);
            console.log(typeof (string_data));
            console.log(string_data);
            let data_to_flask = {
                "text": string_data
            };
            try {
                response2 = await axios.post('http://127.0.0.1:5000/postCalculusLimits', data_to_flask, {
                    headers: {
                        "content-type": "application/json"
                    }
                });
            }
            catch (err) {
                const error = new Error("image mismatch_Error. Select the correct Problem type");
                error.statusCode = 400;
                throw error;
            }
        }
        //console.log(response2.data.data_result);
        clearFile(file_path);
        let obje = JSON.parse(response2.data.data_result);
        res.status(200).json(obje);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

//evaluating linear differential equations
exports.postCalculusLDE = async (req, res, next) => {
    try {
        let response2, latexData;
        file_name = req.files.image[0].filename;
        file_path = req.files.image[0].path;
        var data = base64Img.base64Sync(file_path); //img to base64 data
        let config = {
            headers: {
                "content-type": "application/json",
                "app_id": process.env.API_ID,
                "app_key": process.env.API_KEY
            }
        };
        let imgData = { "src": data, "formats": ["text", "data", "html"], "data_options": { "include_asciimath": true, "include_latex": true } };
        const response = await axios.post('https://api.mathpix.com/v3/text', imgData, config);
        if (!response) {
            throw error;
        }
        else {
            let string_data = response.data.text;
            latexData = string_data;
            console.log(string_data);
            string_data = string_data.substring(2, string_data.length - 2);
            console.log(typeof (string_data));
            console.log(string_data);
            let data_to_flask = {
                "text": string_data
            };
            try {
                response2 = await axios.post('http://127.0.0.1:5000/postCalculusLDE', data_to_flask, {
                    headers: {
                        "content-type": "application/json"
                    }
                });
            }
            catch (err) {
                const error = new Error("image mismatch_Error. Select the correct Problem type");
                error.statusCode = 400;
                throw error;
            }
        }
        //console.log(response2.data.data_result);
        clearFile(file_path);
        let obje = JSON.parse(response2.data.data_result);
        res.status(200).json({ ...obje, latexString: latexData });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

//evaluating binomial expansions
exports.postBinomialAny = async (req, res, next) => {
    try {
        let response2, latexData;
        file_name = req.files.image[0].filename;
        file_path = req.files.image[0].path;
        var data = base64Img.base64Sync(file_path); //img to base64 data
        let config = {
            headers: {
                "content-type": "application/json",
                "app_id": process.env.API_ID,
                "app_key": process.env.API_KEY
            }
        };
        let imgData = { "src": data, "formats": ["text", "data", "html"], "data_options": { "include_asciimath": true, "include_latex": true } };
        const response = await axios.post('https://api.mathpix.com/v3/text', imgData, config);
        if (!response) {
            const error = new Error("error from open-sourced api");
            throw error;
        }
        else {
            let string_data = response.data.text;
            latexData = string_data;
            console.log(string_data);
            string_data = string_data.substring(2, string_data.length - 2);
            console.log(typeof (string_data));
            console.log(string_data);
            let data_to_flask = {
                "text": string_data
            };
            try {
                response2 = await axios.post('http://127.0.0.1:5000/postBinomialAny', data_to_flask, {
                    headers: {
                        "content-type": "application/json"
                    }
                });
            }
            catch (err) {
                const error = new Error("image mismatch_Error. Select the correct Problem type");
                error.statusCode = 400;
                throw error;
            }
        }
        clearFile(file_path);
        let obje = JSON.parse(response2.data.data_result);
        res.status(200).json({ ...obje, latexString: latexData });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

//performing Series expansion
exports.postSeriesExpan = async (req, res, next) => {
    try {
        let response2, latexData;
        file_name = req.files.image[0].filename;
        file_path = req.files.image[0].path;
        var data = base64Img.base64Sync(file_path); //img to base64 data
        let config = {
            headers: {
                "content-type": "application/json",
                "app_id": process.env.API_ID,
                "app_key": process.env.API_KEY
            }
        };
        let imgData = { "src": data, "formats": ["text", "data", "html"], "data_options": { "include_asciimath": true, "include_latex": true } };
        const response = await axios.post('https://api.mathpix.com/v3/text', imgData, config);
        if (!response) {
            const error = new Error("error from open-sourced api");
            throw error;
        }
        else {
            let string_data = response.data.text;
            latexData = string_data;
            console.log(string_data);
            string_data = string_data.substring(2, string_data.length - 2);
            console.log(typeof (string_data));
            console.log(string_data);
            let data_to_flask = {
                "text": string_data
            };
            try {
                response2 = await axios.post('http://127.0.0.1:5000/postSeriesExpan', data_to_flask, {
                    headers: {
                        "content-type": "application/json"
                    }
                });
            }
            catch (err) {
                const error = new Error("image mismatch_Error. Select the correct Problem type");
                error.statusCode = 400;
                throw error;
            }
        }
        clearFile(file_path);
        let obje = JSON.parse(response2.data.data_result);
        res.status(200).json({ ...obje, latexString: latexData });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

//performing fourier series expansion
exports.postFourierExpan = async (req, res, next) => {
    try {
        let response2, latexData;
        file_name = req.files.image[0].filename;
        file_path = req.files.image[0].path;
        var data = base64Img.base64Sync(file_path); //img to base64 data
        let config = {
            headers: {
                "content-type": "application/json",
                "app_id": process.env.API_ID,
                "app_key": process.env.API_KEY
            }
        };
        let imgData = { "src": data, "formats": ["text", "data", "html"], "data_options": { "include_asciimath": true, "include_latex": true } };
        const response = await axios.post('https://api.mathpix.com/v3/text', imgData, config);
        if (!response) {
            const error = new Error("error from open-sourced api");
            throw error;
        }
        else {
            let string_data = response.data.text;
            latexData = string_data;
            console.log(string_data);
            string_data = string_data.substring(2, string_data.length - 2);
            console.log(typeof (string_data));
            console.log(string_data);
            let data_to_flask = {
                "text": string_data
            };
            try {
                response2 = await axios.post('http://127.0.0.1:5000/postFourierExpan', data_to_flask, {
                    headers: {
                        "content-type": "application/json"
                    }
                });
            }
            catch (err) {
                const error = new Error("image mismatch_Error. Select the correct Problem type");
                error.statusCode = 400;
                throw error;
            }
        }
        clearFile(file_path);
        let obje = JSON.parse(response2.data.data_result);
        res.status(200).json({ ...obje, latexString: latexData });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

//evaluating word problems
exports.postWordProb = async (req, res, next) => {
    try {
        let response2, latexData;
        file_name = req.files.image[0].filename;
        file_path = req.files.image[0].path;
        var data = base64Img.base64Sync(file_path); //img to base64 data
        let config = {
            headers: {
                "content-type": "application/json",
                "app_id": process.env.API_ID,
                "app_key": process.env.API_KEY
            }
        };
        let imgData = { "src": data, "formats": ["text", "data", "html"], "data_options": { "include_asciimath": true, "include_latex": true } };
        const response = await axios.post('https://api.mathpix.com/v3/text', imgData, config);
        if (!response) {
            const error = new Error("error from open-sourced api");
            throw error;
        }
        else {
            let string_data = response.data.text;
            latexData = string_data;
            console.log(string_data);
            let data_to_flask = {
                "text": string_data
            };
            try {
                response2 = await axios.post('http://127.0.0.1:5000/postWordProblem', data_to_flask, {
                    headers: {
                        "content-type": "application/json"
                    }
                });
            }
            catch (err) {
                const error = new Error("image mismatch_Error. Select the correct Problem type");
                error.statusCode = 400;
                throw error;
            }
        }
        clearFile(file_path);
        let obje = JSON.parse(response2.data.data_result);
        res.status(200).json({ ...obje, latexString: latexData });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}


//delete image files after use
const clearFile = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
}