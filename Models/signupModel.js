const {Schema, model} = require("mongoose")


const SignupSchema = new Schema({
name:{type:String},
email:{type:String},
mobile:{type:Number},
password:{type:String},
confirm_pw:{type:String}

})

module.exports = model('Signup',SignupSchema)