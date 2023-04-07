let {mongoose}=require('mongoose')

let schema=mongoose.Schema({
    message:String,
    title:String,
    selectedfile:String,
    likecount:Number
})
let postSchema=mongoose.model('Post',schema)
module.exports=postSchema