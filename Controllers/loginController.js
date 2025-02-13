const signupmodel =require('../Models/signupModel')

exports.login = async(req,res,next)=>{

try {
    
const {email,password} = req.body
const logindoc = await signupmodel.findOne({email,password})
if(!logindoc){
    return res.status(404).json({error:"User not found please create account "})
}
return res.status(201).json({message:"login successfull",data:logindoc})

} catch (error) {
    return res.status(404).json({error:"something went wrong",message:error.message})
}

}