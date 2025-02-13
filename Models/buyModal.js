const {Schema , model} = require("mongoose")

const buyschema = new Schema({
name:{type:String},
address:{type:String},
phoneno:{type:Number},
productid: { type: Schema.Types.ObjectId,ref:'sitedetails' ,required: true }
})
module.exports = model('buyerdetails',buyschema)