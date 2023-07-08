const { default: mongoose } = require("mongoose");
let postSchema = require("../modal/postSchema");

exports.getPosts = async (req, res) => {
 
  let {page}=req.query
  page=parseInt(page)
  const limit =2
  const currentIndex=(page-1)*limit
const total=await postSchema.count()
  let posts = await postSchema.find().sort({_id:-1}).limit(limit).skip(currentIndex);
 console.log(page);
  res.status(201).json({data:posts,currentPage:page,totalPage:Math.ceil(total/limit)});
};
exports.createPost = async (req, res) => {
  console.log(req.body);
  let newPost = new postSchema(req.body);
  newPost = await newPost.save();
  console.log(newPost);
  res.status(201).json(newPost);
};
exports.getPost = async (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  let result = await postSchema.find({ _id: id });
  console.log(result);
};
exports.updatePost = async (req, res) => {
  const { id } = req.params;

  console.log(req.body);

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id");
  let updated = await postSchema.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  res.status(200).json(updated);
  
};
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id");
  await postSchema.deleteOne({ _id: id });
  res.status(200).json({message:"Deleted one post"});
};
exports.likePost = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if(!req.userId) return res.json({message:"Unauthenticated access"})
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id");
    const post=await postSchema.findById({_id:id})

    const index=post.likes.filter(like=>like===req.userId)
    !index.length>0?
    post.likes.push(req.userId):post.likes.filter(like=>like!==req.userId)
    
    let updated = await postSchema.findByIdAndUpdate({ _id: id }, post, {
      new: true,
    });
    res.status(200).json(updated);
    console.log(updated);
};
exports.searchPosts=async(req,res)=>{
 const {query,tags}=req.query
console.log(req.query);
const title=new RegExp(query,'i')
const posts=await postSchema.find({$or:[{title},{tags:{$in:tags.split(',')}}]})
console.log(posts);
res.status(200).json(posts)
}

