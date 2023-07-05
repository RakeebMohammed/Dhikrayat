let express=require('express')
let router=express.Router()
let {getPosts,createPost,getPost,updatePost,deletePost, likePost}=require('../controller/postController')
router.get('/',getPosts)
router.post('/createPost',createPost)
router.patch('/:id',updatePost)
router.delete('/:id',deletePost)
router.put('/:id',likePost)
router.get('/getPost',getPost)

module.exports=router