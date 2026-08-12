import asyncHandler from "../utils/asyncHandler.js"

const registerUser = asyncHandler(async(req,res)=>{
    //get user detail from frontend
    //validation - not empty
    //check if user already exists: username or email
    //check for images, check for avatar
    //upload theme to cloudinary, avatar
    //create user object - create antry in db
    //remove password and refresh field from response
    //check for  user creation
    //return response
    
})

export {registerUser}