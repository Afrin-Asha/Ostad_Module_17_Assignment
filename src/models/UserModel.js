const mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
    email:{type:String,unique:true,required:true,lowercase:true},
    firstName: {type: String,required: true},
    lastName:{type: String,required: true},
    email: {type: String,required: true,unique: true,lowercase:true},
    password: {type: String,required: true},
    address: {type: String},
    phoneNumber: {type: String,default: null}
},
{timestamps:true,versionKey:false}
)
const UserModel=mongoose.model('users',DataSchema)
module.exports=UserModel