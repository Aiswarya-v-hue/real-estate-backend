const jwt = require("jsonwebtoken");



const brokerauth = (req,res,next)=>{
    console.log("Middleware hit :checking token ...");
    
const token = req.header("Authorization");

if(!token){
    return res.status(403).json({message:"unauthorized:this webpage is for sanjay only."})
}
try{

const decoded = jwt .verify(token.replace("Bearer ",""), process.env.JWT_SECRET);

if(decoded.email !== "sanjay@gmail.com"){
    return res.status(403).json({message:"this webpage is created for one broker sanjay.it is his property  "})
}
req.user = decoded;
next();
} catch(error){
    return res.status(403).json({message:"INVALID OR EXPIRED TOKEN .ACCESS DENIED "})
}




}
module.exports = brokerauth;