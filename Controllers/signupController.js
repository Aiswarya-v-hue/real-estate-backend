

const Signupmodel = require("../Models/signupModel")

exports.Signup= async(req,res,next)=>{
    try{
const {name,email,mobile,confirm_pw,password}= req.body

const signupdoc = new Signupmodel({name,email,mobile,confirm_pw,password})
await signupdoc.save()
return res.status(201).json({message:"Created Successfully ",data:signupdoc})


    }
    catch(err){
        return res.status(404).json({error:"Something wrong ",message:err.message})
    }
}


exports.getall = async (req,res)=>{
try {
    const records = await signupModel.find()
if(!records || records ===0){
return res.status.json({message:"records not found"})

}else{
return res.status(200).json({data:records})
}
} catch (error) {
    return res.status(500).json({message:"error fetching records",error:error.message})
}

}

exports.getbyId = async (req,res)=>{
try {
    const {id} = req.params;
    const recordbyid = await signupModel.findById(id)
return res.status(200).json({message:"record fetched",data:recordbyid})

} catch (error) {
   return res.status(500).json({message:"error fetching record",error:error.message}) 
}
    
}




