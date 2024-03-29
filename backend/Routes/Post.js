const express = require("express");

const router = express.Router();
const {createPost,likeUnlikePost,deletePost, getFollowingPosts,updateCaption, addComment, deleteComment,getPost}= require("../Controllers/Post")
const {isAuthenticated} = require("../middleware/auth");



router.get("/post/:id",getPost);

//create post 
router.post("/post/upload",isAuthenticated,createPost);


//like unlike post
router.get("/likepost/:id",isAuthenticated, likeUnlikePost)


//delete post 
router.delete("/post/:id",isAuthenticated,deletePost)


// get following posts 
router.get("/getFollowingPosts",isAuthenticated,getFollowingPosts)



//update caption
router.put("/post/:id" , isAuthenticated, updateCaption);

//add update comment
router.put("/post/comment/:id" , isAuthenticated, addComment);


//delete comment

router.delete("/post/comment/:id",isAuthenticated,deleteComment)



module.exports=router