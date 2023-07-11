let express=require('express')
let router=express.Router()
let {getPosts,createPost,getPost,updatePost,deletePost, likePost,searchPosts}=require('../controller/postController')

const validateToken=require('../middleware/validateToken')
router.get('/',getPosts)
router.get('/search',searchPosts)
router.post('/createPost',createPost)
router.patch('/:id',validateToken,updatePost)
router.delete('/:id',deletePost)
router.put('/:id',validateToken,likePost)
router.get('/:id',getPost)

module.exports=router