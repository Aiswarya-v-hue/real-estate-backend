const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginBroker = async(req,res)=>{
    console.log("login route hit");
    
    const {email,password} = req.body;



const brokeremail = process.env.BROKER_EMAIL;
const brokerpassword  = process.env.BROKER_PASSWORD;

if(email!==brokeremail || password !== brokerpassword){
    return res.status(403).json({message:"this website is created for broker sanjay only he can login "})
}

const token =jwt.sign({email},process.env.JWT_SECRET,{
    expiresIn:"1h",
});
res.status(200).json({message :"login successfull",token})

};

module.exports = {loginBroker};


  