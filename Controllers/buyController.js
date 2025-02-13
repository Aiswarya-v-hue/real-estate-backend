const buyermodel = require('../Models/buyModal')

exports.create = async (req, res) => {
  try {
    const { name, address, phoneno, productid } = req.body; // Get productid from request

    if (!productid) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const newBuyer = new buyermodel({
      name,
      address,
      phoneno,
      productid // Save productid
    });

    await newBuyer.save();
    res.status(201).json({ message: "Buyer created successfully", newBuyer });
  } catch (error) {
    console.error("Error creating buyer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};





exports.remove = async (req,res)=>{
    try {
        const {id}= req.params;
await buyermodel.findByIdAndDelete(id)
return res.status(200).json({message:"record deleted successfully"})

    } catch(err){
return res.status(500).json({message:"error in deleting record",error:err.message})

    }

}

exports.getall = async (req,res,next)=>{
try{
let details = await buyermodel.find()
return res.status(200).json({message:"data fetched from api successfully",data:details})
}catch(err){

  return res.status(500).json({message:"error in fetching records",err:err.message})
}

}