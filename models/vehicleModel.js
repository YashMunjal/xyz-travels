const mongoose=require('mongoose');

const vehicleSchema=new mongoose.Schema({
    vehicleNumber:{type:String,unique:true},
    vehicleMake:{type:String},
    vehicleCapacity:{type:Number},
    vehicleFair:{type:Number},
    vehicleDriver:{type:mongoose.Schema.Types.ObjectId,ref:'Driver'}
})

module.exports=mongoose.model('Vehicle',vehicleSchema);