const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary");



//Register user 

exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        //this variable is written for uploading images for profile pic while registering user
        folder:"avatars",
        width: 150,
        crop: "scale",
    })

    const { name, email, password } = req.body;  //by using req.body it means that we are taking name email password from frontend as a request by use state method 

    const user = await User.create({

        // here we will create a user in backend
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    });

    // now the below lines are given as a function as sendtoken to make files consume less lines its from const token to token, }); of 7 lines in utils folder as jwttoken.js

    // const token = user.getJWTToken(); //here jwt token is called and it is defined in usermodel

    // res.status(201).json({
    //     success: true,
    //     // user,
    //     token,
    // });
    sendToken(user, 201, res); //here this function is called to collect the login token and save it in cookies
});

//lOGIN USER 

exports.loginUser = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body; //it means we will take the details of email and password input from 

    //checking if user has given password and email then

    if (!email || !password) {
        return next(new ErrorHander("Please enter email and password", 400))
    }

    //now we will findout previous user and previous userpassword in below for selecting the password we used select method because in the usermodel password is given as select false so we cannot select it directly so we have selected it by select method

    const user = await User.findOne({ email }).select("+password"); //always use await function when u specify aync in fuction defining

    if (!user) {
        return next(new ErrorHander("indvalid email or password", 401));
        //here 401 is a satuscode for unauthorize request
    }

    const isPasswordMatched = await user.comparePassword(password); //this compare password function is given in usermodel ... this compare password is used to compare the given password in input tag is same as user given password when he was registered so in capare password the parameter given as password is the password given by person while logging details putting from this we will check this password is really the password which we saved in the databases

    if (!isPasswordMatched) {
        return next(new ErrorHander("Invalid email and password", 401));
    }

    // const token = user.getJWTToken(); //after the password is matched go further with jwttoken and the user will be logged in

    // res.status(200).json({
    //     success: true,
    //     token
    // });
    sendToken(user, 200, res); //here this function is called to collect the login token and save it in cookies
});

// Logout user

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out"
    });
});

//Get user details

exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});