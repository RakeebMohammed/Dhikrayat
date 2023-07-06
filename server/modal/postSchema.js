let {mongoose}=require('mongoose')

let schema=mongoose.Schema({
    message:String,
    title:String,
    tags:[String],
    selectedfile:String,
    likes:{
        type:[String],
        default:[]
    }
   
})
let postSchema=mongoose.model('Post',schema)
module.exports=postSchema