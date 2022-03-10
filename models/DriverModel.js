const mongoose=require('mongoose');

const driverSchema=new mongoose.Schema({
    name:{type:String},
    aadharNumber:{type:String,unique:true},
    address:{type:String},
    city:{type:String},
    state:{type:String},
    pincode:{type:Number},
    mobileNumber:{type:Number},
    vehicleId:{type:mongoose.Schema.Types.ObjectId,ref:'Vehicle'}
})

module.exports=mongoose.model('Driver',driverSchema);