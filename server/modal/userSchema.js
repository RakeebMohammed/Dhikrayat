const {mongoose}=require('mongoose')
const schema=mongoose.Schema({
    firstname:String,
    lastname:String,
    password:String,
    email:String

})
const userSchema=mongoose.model('Users',schema)
module.exports=userSchema