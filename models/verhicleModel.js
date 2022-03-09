const mongoose=require('mongoose');

const vehicleSchema=new mongoose.Schema({
    vehicleType:{type:String},
    vehicleNumner:{type:String,unique:true},
    vehicleMake:{type:String},
    vehicleColour:{type:String,default:"customer"},
    vehicleDriver:mongoose.Schema.Types.ObjectId,ref:'Driver'
})

module.exports=mongoose.model('User',userSchema);