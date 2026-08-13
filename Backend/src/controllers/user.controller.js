import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import {userModel} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

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
    
    const { username,email,fullName,password }=req.body
    // console.log("fullname:",fullName)

    if([fullName,email,username,password].some((field)=> field?.trim()==="")){
       throw new ApiError(400,"All fields are required")
    }

    const existingUser=await userModel.findOne({
        $or:[{email},{username}]
    })

    if(existingUser){ 
        throw new ApiError(409,"User with email or username already exists")
    }

    //These two are coming from user route's multer middleware
    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required");
    }

    //upload on cloudinary

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    //check avatar is loaded or not
    if(!avatar){
        throw new ApiError(400,"Avatar file is required");
    }

    //Entry in database

    const user = await userModel.create({
        fullName,
        avatar:avatar.url, //sends only the url
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })
    const createdUser = await userModel.findById(user._id).select(
        "-password -refreshToken" //this removes the password and refreshToken
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    return res.status(201).json(
        new ApiResponse(200,createdUser, "User registered successfully")
    )

})

export {registerUser}