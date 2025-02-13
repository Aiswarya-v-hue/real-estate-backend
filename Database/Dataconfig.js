const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.MongoDb_Url).then(()=>{
   console.log("mongodb connected succesfully");  
})
.catch((error)=>{
    console.log(error);
    
});

module.exports = mongoose;