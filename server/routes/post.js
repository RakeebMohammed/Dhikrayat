let express=require('express')
let router=express.Router()
let {getPosts,createPost,getPost}=require('../controller/postController')
router.get('/',getPosts)
router.post('/createPost',createPost)
router.get('/getPost',getPost)
module.exports=router