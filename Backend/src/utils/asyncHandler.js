//Wrapper function

//In case of Promise
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise
      .resolve(requestHandler(req, res, next))
      .catch((error) => next(error));
  };
};


//This for async/await
// const asyncHandler=(fn)=>async(req,res,next)=>{ //Taking Higher order function
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success:false,
//             message:error.message
//         })
//     }
// } 


export default asyncHandler;