let {mongoose}=require('mongoose')

let schema=mongoose.Schema({
    message:String,
    title:String,
    creator:String,
    tags:[String],
    selectedfile:String,
    likeCount:Number,
    createdAt:{
        type:Date,
        default:new Date
    }
})
let postSchema=mongoose.model('Post',schema)
module.exports=postSchema