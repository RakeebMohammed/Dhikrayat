let express=require('express')
let router=express.Router()
let {getPosts,createPost}=require('../controller/postController')
router.get('/',getPosts)
router.post('/createPost',createPost)
module.exports=router