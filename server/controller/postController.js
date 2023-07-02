let postSchema=require('../modal/postSchema')

exports.getPosts=async(req,res)=>{
      
        let result=await postSchema.find()
res.status(201).json(result)
}
exports.createPost=async(req,res)=>{
        console.log(req.body);
 let newPost= new postSchema(req.body)
 newPost=await newPost.save()
 res.status(201).json(newPost)
}
exports.getPost=async(req,res)=>{
console.log(req.body);
        const {id}=req.body
        let result=await postSchema.find({_id:id})
        console.log(result);    

}