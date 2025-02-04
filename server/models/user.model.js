import { Schema , model } from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
const userSchema = new Schema ({
    fullName :{
        type : String ,
        required : [true , 'Name is required'] , 
        minLength : [5 , 'minimum 5 characters'] , 
        maxLength : [50 , 'maximum 50 characters'] , 
        lowercase : true , 
        trim : true , 
    } , 
    email :{
        type : String , 
        required : [true , 'Email is required'] , 
        lowercase : true , 
        trim : true , 
        unique : true , 
         // match validator 
    } , 
    password  :{
        type : String  ,
        required : [true , 'Name is required'] , 
        minLength : [8 , 'minimum 8 characters'] , 
        select  : false 
    } , 

    avatar : {
        public_id :{
            type : String  
        } , 
        secure_url : {
            type : String  
        }
    } , 
    role : {
        type : String , 
        enum : ['USER' , 'ADMIN']  , 
        default : 'USER'
    } , 
    forgotPasswordToken : String , 
    forgotPasswordExpiry : Date , 
    subscription:{
        id : String , 
        status : String 
    }
} , {timestamps : true }) ; 

userSchema.pre('save' , async function(next) {
    if(!this.isModified('password')){
        return next() ; 
    }
    this.password = await bcrypt.hash(this.password , 10)
})

userSchema.methods = {
    generateJWTToken : function () {
        return jwt.sign(
            { id : this._id , email : this.email , subscription : this.subscription , role : this.role } , 
        process.env.JWT_SECRET  , 
        {
            expiresIn : process.env.JWT_EXPIRY , 
        }
    )
    } , 
    comparePassword : async function(plainTextPassword) {
        return await bcrypt.compare(plainTextPassword , this.password)
    } , 
    generatePasswordResetToken: async function () {
        // creating a random token using node's built-in crypto module
        const resetToken = crypto.randomBytes(20).toString('hex');
    
        // Again using crypto module to hash the generated resetToken with sha256 algorithm and storing it in database
        this.forgotPasswordToken = crypto
          .createHash('sha256')
          .update(resetToken)
          .digest('hex');
    
        // Adding forgot password expiry to 15 minutes
        this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;
    
        return resetToken;
      },
}
const User = model('User' , userSchema)


export default User ; 