import Axios from "axios";
import RNFetchBlob from "react-native-fetch-blob"
import fs from "react-native-fs"
export const  EQUATION_ENTERED = 'EQUATION_ENTERED';
export const  EQUATION_TYPE = 'EQUATION_TYPE';
export const  EQUATION_SCANNED= 'EQUATION_SCANNED';
export const  RESET_ANSWER= 'RESET_ANSWER';
export const RESET='RESET';
export const USER='USER'
export const  equationType = (type) => {
    return {type:EQUATION_TYPE,eq_type:type}
}
export const userName = (user) => {
    return {type:USER,user:user}
}
export const  equationEntered = (eqt) => {
    return {type:EQUATION_ENTERED,equation:eqt}
}
export const  reset = (eqt) => {
    return {type:RESET}
}
export const  resetAnswer = (eqt) => {
    return {type:RESET_ANSWER}
}
export const  equationScanned = (file_path,eq_type) => {
    return async dispatch => {
        console.log("Server acessed");
        if (file_path === null){
            file_path=fs.DocumentDirectoryPath
            eq_type="Bodmas"
        }
        console.log(file_path);
        var response;
        try{
                 if (eq_type === "Bodmas"){const res = await RNFetchBlob.fetch('POST',"https://hacknode-api.herokuapp.com/core/sendImageToBodmas", {
                    'Content-Type' : 'multipart/form-data',
                  },[// element with property `filename` will be transformed into `file` in form data
                    { name : 'image', filename : 'avatar.jpg',type:'image/jpeg', data: RNFetchBlob.wrap(file_path)}]);
                    console.log(res.respInfo.status)
                    const res_ob=JSON.parse(res.data)
                    console.log(res_ob)
                    console.log(res_ob.ans)
                    console.log(res.respInfo.status)
                    response=res_ob;
                    if (res.respInfo.status === 500){
                        console.log('500');
                        throw new Error('Image mismatch, Please click the right Equation')
                    }
                    else if(res.respInfo.status === 400){
                        console.log('400 coming');
                        throw new Error('Image mismatch, Please click the right Equation!');
                    }else if(res.respInfo.status === 422){
                        throw new Error('Some server issues. Please retake the image');
                    }
                    dispatch({type:EQUATION_SCANNED,equation:'',answer:response});}

                    else if(eq_type === "Equation Solver")
                    
                        {console.log("Equation Solver")
                            const res = await RNFetchBlob.fetch('POST',"https://hacknode-api.herokuapp.com/core/sendImageToEqSolve", {
                    'Content-Type' : 'multipart/form-data',
                  },[// element with property `filename` will be transformed into `file` in form data
                    { name : 'image', filename : 'avatar.jpg',type:'image/jpeg', data: RNFetchBlob.wrap(file_path)}]);
                    console.log(res.respInfo.status)
                    const res_ob=JSON.parse(res.data)
                    console.log(res_ob)
                    response=res_ob
                    if (res.respInfo.status === 500){
                        console.log('500');
                        throw new Error('Image mismatch, Please click the right Equation')
                    }
                    else if(res.respInfo.status === 400){
                        console.log('400 coming');
                        throw new Error('Image mismatch, Please click the right Equation!');
                    }else if(res.respInfo.status === 422){
                        throw new Error('Some server issues. Please retake the image');
                    }
                    dispatch({type:EQUATION_SCANNED,equation:'',answer:response});
                    }else if(eq_type === "Bodmas Checker")
                    
                    {console.log("Bodmas checker")
                        const res = await RNFetchBlob.fetch('POST',"https://hacknode-api.herokuapp.com/core/sendImageToBodmasChecker", {
                'Content-Type' : 'multipart/form-data',
              },[// element with property `filename` will be transformed into `file` in form data
                { name : 'image', filename : 'avatar.jpg',type:'image/jpeg', data: RNFetchBlob.wrap(file_path)}]);
                console.log(res.respInfo.status)
                const res_ob=JSON.parse(res.data)
                console.log(res_ob)
                response=res_ob
                if (res.respInfo.status === 500){
                    console.log('500');
                    throw new Error('Image mismatch, Please click the right Equation')
                }
                else if(res.respInfo.status === 400){
                    console.log('400 coming');
                    throw new Error('Image mismatch, Please click the right Equation!');
                }else if(res.respInfo.status === 422){
                    throw new Error('Some server issues. Please retake the image');
                }
                dispatch({type:EQUATION_SCANNED,equation:'',answer:response});
                }
                    else if(eq_type === 'Circle'){
                        console.log("Circle")
                        const res = await RNFetchBlob.fetch('POST',"https://hacknode-api.herokuapp.com/core/sendImageToCircleCoordinate", {
                        'Content-Type' : 'multipart/form-data',
                    },[// element with property `filename` will be transformed into `file` in form data
                        { name : 'image', filename : 'avatar.jpg',type:'image/jpeg', data: RNFetchBlob.wrap(file_path)}]);
                        console.log(res.respInfo.status)
                        const res_ob=JSON.parse(res.data)
                        console.log(res_ob)
                        response=res_ob
                        if (res.respInfo.status === 500){
                            console.log('500');
                            throw new Error('Image mismatch, Please click the right Equation')
                        }
                        else if(res.respInfo.status === 400){
                            console.log('400 coming');
                            throw new Error('Image mismatch, Please click the right Equation!');
                        }else if(res.respInfo.status === 422){
                            throw new Error('Some server issues. Please retake the image');
                        }
                    dispatch({type:EQUATION_SCANNED,equation:'',answer:response});
                    }
                    else if(eq_type === 'Ellipse'){
                        console.log("Ellipse")
                        const res = await RNFetchBlob.fetch('POST',"https://hacknode-api.herokuapp.com/core/sendImageToEllipseCoordinate", {
                        'Content-Type' : 'multipart/form-data',
                    },[// element with property `filename` will be transformed into `file` in form data
                        { name : 'image', filename : 'avatar.jpg',type:'image/jpeg', data: RNFetchBlob.wrap(file_path)}]);
                        console.log(res.respInfo.status)
                        const res_ob=JSON.parse(res.data)
                        console.log(res_ob)
                        response=res_ob
                        if (res.respInfo.status === 500){
                            console.log('500');
                            throw new Error('Image mismatch, Please click the right Equation')
                        }
                        else if(res.respInfo.status === 400){
                            console.log('400 coming');
                            throw new Error('Image mismatch, Please click the right Equation!');
                        }else if(res.respInfo.status === 422){
                            throw new Error('Some server issues. Please retake the image');
                        }
                    dispatch({type:EQUATION_SCANNED,equation:'',answer:response});
                    }
                    else if(eq_type === 'Series Expansion'){
                        console.log("Series Expansion")
                        const res = await RNFetchBlob.fetch('POST',"https://hacknode-api.herokuapp.com/core/sendImageToSeriesExpan", {
                        'Content-Type' : 'multipart/form-data',
                    },[// element with property `filename` will be transformed into `file` in form data
                        { name : 'image', filename : 'avatar.jpg',type:'image/jpeg', data: RNFetchBlob.wrap(file_path)}]);
                        console.log(res.respInfo.status)
                        const res_ob=JSON.parse(res.data)
                        console.log(res_ob)
                        response=res_ob
                        if (res.respInfo.status === 500){
                            console.log('500');
                            throw new Error('Image mismatch, Please click the right Equation')
                        }
                        else if(res.respInfo.status === 400){
                            console.log('400 coming');
                            throw new Error('Image mismatch, Please click the right Equation!');
                        }else if(res.respInfo.status === 422){
                            throw new Error('Some server issues. Please retake the image');
                        }
                    dispatch({type:EQUATION_SCANNED,equation:'',answer:response});
                    }
                    else if(eq_type === 'Lines and Coordinates'){
                        console.log("Lines and Coordinate")
                        const res = await RNFetchBlob.fetch('POST',"https://hacknode-api.herokuapp.com/core/sendImageToLinesCoordinate", {
                        'Content-Type' : 'multipart/form-data',
                    },[// element with property `filename` will be transformed into `file` in form data
                        { name : 'image', filename : 'avatar.jpg',type:'image/jpeg', data: RNFetchBlob.wrap(file_path)}]);
                        console.log(res.respInfo.status)
                        const res_ob=JSON.parse(res.data)
                        console.log(res_ob)
                        response=res_ob
                        if (res.respInfo.status === 500){
                            console.log('500');
                            throw new Error('Image mismatch, Please click the right Equation')
                        }
                        else if(res.respInfo.status === 400){
                            console.log('400 coming');
                            throw new Error('Image mismatch, Please click the right Equation!');
                        }else if(res.respInfo.status === 422){
                            throw new Error('Some server issues. Please retake the image');
                        }
                    dispatch({type:EQUATION_SCANNED,equation:'',answer:response});
                    }
                    else if (eq_type === 'Differentiation'){
                        console.log("Differentiation")
                        const res = await RNFetchBlob.fetch('POST',"https://hacknode-api.herokuapp.com/core/sendImageToCalculusDerivative", {
                        'Content-Type' : 'multipart/form-data',
                    },[// element with property `filename` will be transformed into `file` in form data
                        { name : 'image', filename : 'avatar.jpg',type:'image/jpeg', data: RNFetchBlob.wrap(file_path)}]);
                        console.log(res.respInfo.status)
                        const res_ob=JSON.parse(res.data)
                        console.log(res_ob)
                        response=res_ob
                        if (res.respInfo.status === 500){
                            console.log('500');
                            throw new Error('Image mismatch, Please click the right Equation')
                        }
                        else if(res.respInfo.status === 400){
                            console.log('400 coming');
                            throw new Error('Image mismatch, Please click the right Equation!');
                        }else if(res.respInfo.status === 422){
                            throw new Error('Some server issues. Please retake the image');
                        }
                    dispatch({type:EQUATION_SCANNED,equation:'',answer:response});
                    }
                    else if (eq_type === 'Indefinite Integration'){
                        console.log("Indefinite Integ")
                        const res = await RNFetchBlob.fetch('POST',"https://hacknode-api.herokuapp.com/core/sendImageToIndefIntegrals", {
                        'Content-Type' : 'multipart/form-data',
                    },[// element with property `filename` will be transformed into `file` in form data
                        { name : 'image', filename : 'avatar.jpg',type:'image/jpeg', data: RNFetchBlob.wrap(file_path)}]);
                        console.log(res.respInfo.status)
                        const res_ob=JSON.parse(res.data)
                        console.log(res_ob)
                        response=res_ob
                        if (res.respInfo.status === 500){
                            console.log('500');
                            throw new Error('Image mismatch, Please click the right Equation')
                        }
                        else if(res.respInfo.status === 400){
                            console.log('400 coming');
                            throw new Error('Image mismatch, Please click the right Equation!');
                        }else if(res.respInfo.status === 422){
                            throw new Error('Some server issues. Please retake the image');
                        }
                    dispatch({type:EQUATION_SCANNED,equation:'',answer:response});
                    }
                    else if(eq_type === 'Definite Integration'){
                        console.log("Definite Integr")
                        const res = await RNFetchBlob.fetch('POST',"https://hacknode-api.herokuapp.com/core/sendImageTodefIntegrals", {
                        'Content-Type' : 'multipart/form-data',
                    },[// element with property `filename` will be transformed into `file` in form data
                        { name : 'image', filename : 'avatar.jpg',type:'image/jpeg', data: RNFetchBlob.wrap(file_path)}]);
                        console.log(res.respInfo.status)
                        const res_ob=JSON.parse(res.data)
                        console.log(res_ob)
                        response=res_ob
                        if (res.respInfo.status === 500){
                            console.log('500');
                            throw new Error('Image mismatch, Please click the right Equation')
                        }
                        else if(res.respInfo.status === 400){
                            console.log('400 coming');
                            throw new Error('Image mismatch, Please click the right Equation!');
                        }else if(res.respInfo.status === 422){
                            throw new Error('Some server issues. Please retake the image');
                        }
                    dispatch({type:EQUATION_SCANNED,equation:'',answer:response});
                    }
                    else if (eq_type === 'Double Integration'){
                        console.log("Double In")
                        const res = await RNFetchBlob.fetch('POST',"https://hacknode-api.herokuapp.com/core/sendImageTodoubleIntegrals", {
                        'Content-Type' : 'multipart/form-data',
                    },[// element with property `filename` will be transformed into `file` in form data
                        { name : 'image', filename : 'avatar.jpg',type:'image/jpeg', data: RNFetchBlob.wrap(file_path)}]);
                        console.log(res.respInfo.status)
                        const res_ob=JSON.parse(res.data)
                        console.log(res_ob)
                        response=res_ob
                        if (res.respInfo.status === 500){
                            console.log('500');
                            throw new Error('Image mismatch, Please click the right Equation')
                        }
                        else if(res.respInfo.status === 400){
                            console.log('400 coming');
                            throw new Error('Image mismatch, Please click the right Equation!');
                        }else if(res.respInfo.status === 422){
                            throw new Error('Some server issues. Please retake the image');
                        }
                    dispatch({type:EQUATION_SCANNED,equation:'',answer:response});
                    }
                    else if (eq_type === 'Trignometric Equation'){
                        console.log("Trignometric")
                        const res = await RNFetchBlob.fetch('POST',"https://hacknode-api.herokuapp.com/core/sendImageToEqSolve", {
                        'Content-Type' : 'multipart/form-data',
                    },[// element with property `filename` will be transformed into `file` in form data
                        { name : 'image', filename : 'avatar.jpg',type:'image/jpeg', data: RNFetchBlob.wrap(file_path)}]);
                        console.log(res.respInfo.status)
                        const res_ob=JSON.parse(res.data)
                        console.log(res_ob)
                        response=res_ob
                        if (res.respInfo.status === 500){
                            console.log('500');
                            throw new Error('Image mismatch, Please click the right Equation')
                        }
                        else if(res.respInfo.status === 400){
                            console.log('400 coming');
                            throw new Error('Image mismatch, Please click the right Equation!');
                        }else if(res.respInfo.status === 422){
                            throw new Error('Some server issues. Please retake the image');
                        }
                    dispatch({type:EQUATION_SCANNED,equation:'',answer:response});
                    }
                    else if(eq_type === 'Triple Integration'){
                        console.log('Triple')
                        const res = await RNFetchBlob.fetch('POST',"https://hacknode-api.herokuapp.com/core/sendImageTotripleIntegrals", {
                        'Content-Type' : 'multipart/form-data',
                    },[// element with property `filename` will be transformed into `file` in form data
                        { name : 'image', filename : 'avatar.jpg',type:'image/jpeg', data: RNFetchBlob.wrap(file_path)}]);
                        console.log(res.respInfo.status)
                        const res_ob=JSON.parse(res.data)
                        console.log(res_ob)
                        response=res_ob
                        if (res.respInfo.status === 500){
                            console.log('500');
                            throw new Error('Image mismatch, Please click the right Equation')
                        }
                        else if(res.respInfo.status === 400){
                            console.log('400 coming');
                            throw new Error('Image mismatch, Please click the right Equation!');
                        }else if(res.respInfo.status === 422){
                            throw new Error('Some server issues. Please retake the image');
                        }
                    dispatch({type:EQUATION_SCANNED,equation:'',answer:response});
                    }
                    else if (eq_type === 'Limits'){
                        console.log("Limits")
                        const res = await RNFetchBlob.fetch('POST',"https://hacknode-api.herokuapp.com/core/sendImageTocalculusLimits", {
                        'Content-Type' : 'multipart/form-data',
                    },[// element with property `filename` will be transformed into `file` in form data
                        { name : 'image', filename : 'avatar.jpg',type:'image/jpeg', data: RNFetchBlob.wrap(file_path)}]);
                        console.log(res.respInfo.status)
                        const res_ob=JSON.parse(res.data)
                        console.log(res_ob)
                        response=res_ob
                        if (res.respInfo.status === 500){
                            console.log('500');
                            throw new Error('Image mismatch, Please click the right Equation')
                        }
                        else if(res.respInfo.status === 400){
                            console.log('400 coming');
                            throw new Error('Image mismatch, Please click the right Equation!');
                        }else if(res.respInfo.status === 422){
                            throw new Error('Some server issues. Please retake the image');
                        }
                    dispatch({type:EQUATION_SCANNED,equation:'',answer:response});
                    }
                    else if (eq_type === 'Quadratic Equation'){
                        console.log("Quadratic Equation");
                        const res = await RNFetchBlob.fetch('POST',"https://hacknode-api.herokuapp.com/core/sendImageToEqSolve", {
                        'Content-Type' : 'multipart/form-data',
                    },[// element with property `filename` will be transformed into `file` in form data
                        { name : 'image', filename : 'avatar.jpg',type:'image/jpeg', data: RNFetchBlob.wrap(file_path)}]);
                        console.log(res.respInfo.status)
                        const res_ob=JSON.parse(res.data)
                        console.log(res_ob)
                        response=res_ob
                        if (res.respInfo.status === 500){
                            console.log('500');
                            throw new Error('Image mismatch, Please click the right Equation')
                        }
                        else if(res.respInfo.status === 400){
                            console.log('400 coming');
                            throw new Error('Image mismatch, Please click the right Equation!');
                        }else if(res.respInfo.status === 422){
                            throw new Error('Some server issues. Please retake the image');
                        }
                    dispatch({type:EQUATION_SCANNED,equation:'',answer:response});
                    }
                    else if (eq_type === 'Differential Equation'){
                        console.log("Differential Equation");
                        const res = await RNFetchBlob.fetch('POST',"https://hacknode-api.herokuapp.com/core/sendImageTocalculusLDE", {
                        'Content-Type' : 'multipart/form-data',
                    },[// element with property `filename` will be transformed into `file` in form data
                        { name : 'image', filename : 'avatar.jpg',type:'image/jpeg', data: RNFetchBlob.wrap(file_path)}]);
                        console.log(res.respInfo.status)
                        const res_ob=JSON.parse(res.data)
                        console.log(res_ob)
                        response=res_ob
                        if (res.respInfo.status === 500){
                            console.log('500');
                            throw new Error('Image mismatch, Please click the right Equation')
                        }
                        else if(res.respInfo.status === 400){
                            console.log('400 coming');
                            throw new Error('Image mismatch, Please click the right Equation!');
                        }else if(res.respInfo.status === 422){
                            throw new Error('Some server issues. Please retake the image');
                        }
                    dispatch({type:EQUATION_SCANNED,equation:'',answer:response});
                    }
                    else if (eq_type === 'Word Problems'){
                        console.log("Word Problems");
                        const res = await RNFetchBlob.fetch('POST',"https://hacknode-api.herokuapp.com/core/sendImageToWordProb", {
                        'Content-Type' : 'multipart/form-data',
                    },[// element with property `filename` will be transformed into `file` in form data
                        { name : 'image', filename : 'avatar.jpg',type:'image/jpeg', data: RNFetchBlob.wrap(file_path)}]);
                        console.log(res.respInfo.status)
                        const res_ob=JSON.parse(res.data)
                        console.log(res_ob)
                        response=res_ob
                        if (res.respInfo.status === 500){
                            console.log('500');
                            throw new Error('Image mismatch, Please click the right Equation')
                        }
                        else if(res.respInfo.status === 400){
                            console.log('400 coming');
                            throw new Error('Image mismatch, Please click the right Equation!');
                        }else if(res.respInfo.status === 422){
                            throw new Error('Some server issues. Please retake the image');
                        }
                    dispatch({type:EQUATION_SCANNED,equation:'',answer:response});
                    }
                    else if (eq_type === 'Points and Coordinates'){
                        console.log("Points and Coordinates");
                        const res = await RNFetchBlob.fetch('POST',"https://hacknode-api.herokuapp.com/core/sendImageToCoordinate", {
                        'Content-Type' : 'multipart/form-data',
                    },[// element with property `filename` will be transformed into `file` in form data
                        { name : 'image', filename : 'avatar.jpg',type:'image/jpeg', data: RNFetchBlob.wrap(file_path)}]);
                        console.log(res.respInfo.status)
                        const res_ob=JSON.parse(res.data)
                        console.log(res_ob)
                        response=res_ob
                        if (res.respInfo.status === 500){
                            console.log('500');
                            throw new Error('Image mismatch, Please click the right Equation')
                        }
                        else if(res.respInfo.status === 400){
                            console.log('400 coming');
                            throw new Error('Image mismatch, Please click the right Equation!');
                        }else if(res.respInfo.status === 422){
                            throw new Error('Some server issues. Please retake the image');
                        }
                    dispatch({type:EQUATION_SCANNED,equation:'',answer:response});
                    }
                    else if (eq_type === 'Complex Numbers'){
                        console.log("Complex");
                        const res = await RNFetchBlob.fetch('POST',"https://hacknode-api.herokuapp.com/core/sendImageToComplex", {
                        'Content-Type' : 'multipart/form-data',
                    },[// element with property `filename` will be transformed into `file` in form data
                        { name : 'image', filename : 'avatar.jpg',type:'image/jpeg', data: RNFetchBlob.wrap(file_path)}]);
                        console.log(res.respInfo.status)
                        const res_ob=JSON.parse(res.data)
                        console.log(res_ob)
                        response=res_ob
                        if (res.respInfo.status === 500){
                            console.log('500');
                            throw new Error('Image mismatch, Please click the right Equation')
                        }
                        else if(res.respInfo.status === 400){
                            console.log('400 coming');
                            throw new Error('Image mismatch, Please click the right Equation!');
                        }else if(res.respInfo.status === 422){
                            throw new Error('Some server issues. Please retake the image');
                        }
                    dispatch({type:EQUATION_SCANNED,equation:'',answer:response});
                    }
                    else if (eq_type === 'Fourier Expansion'){
                        console.log("Fourier");
                        const res = await RNFetchBlob.fetch('POST',"https://hacknode-api.herokuapp.com/core/sendImageToFourierExpan", {
                        'Content-Type' : 'multipart/form-data',
                    },[// element with property `filename` will be transformed into `file` in form data
                        { name : 'image', filename : 'avatar.jpg',type:'image/jpeg', data: RNFetchBlob.wrap(file_path)}]);
                        console.log(res.respInfo.status)
                        const res_ob=JSON.parse(res.data)
                        console.log(res_ob)
                        response=res_ob
                        if (res.respInfo.status === 500){
                            console.log('500');
                            throw new Error('Image mismatch, Please click the right Equation')
                        }
                        else if(res.respInfo.status === 400){
                            console.log('400 coming');
                            throw new Error('Image mismatch, Please click the right Equation!');
                        }else if(res.respInfo.status === 422){
                            throw new Error('Some server issues. Please retake the image');
                        }
                    dispatch({type:EQUATION_SCANNED,equation:'',answer:response});
                    }
                    else if (eq_type === 'Binomial Expansion'){
                        console.log("Binomial Expanion");
                        const res = await RNFetchBlob.fetch('POST',"https://hacknode-api.herokuapp.com/core/sendImageToBinomialAny", {
                        'Content-Type' : 'multipart/form-data',
                    },[// element with property `filename` will be transformed into `file` in form data
                        { name : 'image', filename : 'avatar.jpg',type:'image/jpeg', data: RNFetchBlob.wrap(file_path)}]);
                        console.log(res.respInfo.status)
                        const res_ob=JSON.parse(res.data)
                        console.log(res_ob)
                        response=res_ob
                        if (res.respInfo.status === 500){
                            console.log('500');
                            throw new Error('Image mismatch, Please click the right Equation')
                        }
                        else if(res.respInfo.status === 400){
                            console.log('400 coming');
                            throw new Error('Image mismatch, Please click the right Equation!');
                        }else if(res.respInfo.status === 422){
                            throw new Error('Some server issues. Please retake the image');
                        }
                    dispatch({type:EQUATION_SCANNED,equation:'',answer:response});
                    }
                        
            }catch(err){
                console.log(err)
                throw err
            }
        }

    }