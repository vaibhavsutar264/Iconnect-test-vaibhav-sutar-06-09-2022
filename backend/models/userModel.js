const mongoose = require("mongoose");
const validator = require("validator"); // validation on email and password 
const bcrypt = require("bcryptjs"); //to save the password in binary number form
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please Enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4,"Name should have more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter your name"],
        unique: true, //no repeated emails
        validator: [validator.isEmail,"Please Enter a valid Email"],
    },
    password: {
        type:String,
        required: [true, "Please Enter your Password"],
        minLength:[8,"please enter more than 8 characters"],
        select: false, //for non selection
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});
//pre means before saving this function will occur

//this below function is used for hashing the password which is saved in databases
userSchema.pre("save", async function(next){
    // now if this.password is not changed then below condition will apply

    if(!this.isModified("password")){
        next();
        //means do nothing move forward 
    }

    this.password = await bcrypt.hash(this.password,10);
    // and if password is changed then do hash the password
    // bcrypt has a hash function for giving password in binary number and 10 means 10 character of password
});

//JWT TOKEN for generating login token means whenever user will login his all info will save in cookies in jwt token or a token id will given to logged user until he is log in website and save in cookies

//now crete a token by using the methods function
userSchema.methods.getJWTToken = function(){
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}


userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password); 
    // bcrypt has a compare method for checking the password with entered password
    // here we have used bcrypt because the password which is saved in databases is in hash type so by using compare it will compare the actual password with the enteredpassword
    // by using this keyword u were saying thattake password from userschema only

}


module.exports = mongoose.model("User",userSchema);