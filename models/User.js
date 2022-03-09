const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:true,lowercase:true},
    password:{type:String},
    usertype:{type:String,default:"customer"}
})

module.exports=mongoose.model('User',userSchema);