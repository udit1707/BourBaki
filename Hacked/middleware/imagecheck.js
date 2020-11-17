module.exports=(req,res,next)=>{
    if (!req.files||(req.files && !req.files.image)) 
            {
                const error = new Error('No Image provided.');
                error.statusCode = 422;
                throw error;
            }
    next();
}