const express = require("express");
const app = express();
const dotenv = require("dotenv");

const cookieParser = require("cookie-parser");
//now for uploading a file we require body parser and file uploader

const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const errorMiddleware = require("./middleware/error");

dotenv.config({path:"backend/config/config.env"});



app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Routes import

const user = require("./routes/userRoute");
app.use("/api/v1",user); //user data to be post from frontend



app.use(errorMiddleware);

module.exports = app;