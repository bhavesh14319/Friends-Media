const express = require("express");

const {registerUser,loginUser,followUser, logoutUser,updatePassword, updateProfile, deleteUser, myProfile, getUserProfile, getFeedData,getLatestPosts, getAllUsers, forgotPassword, resetPassword, getPosts, getUserPosts,getUserFeed,getSuggestedUsers} = require("../Controllers/User")

const router = express.Router();

const {isAuthenticated} = require("../middleware/auth")






router.get("/follow/:id",isAuthenticated,followUser)

router.get("/logout",logoutUser)

router.get("/user/",isAuthenticated,myProfile);

router.get("/getUserFeed",isAuthenticated,getUserFeed);

router.get("/getSuggestedUsers",isAuthenticated,getSuggestedUsers)

router.put("/update/password",isAuthenticated,updatePassword);

router.put("/update/profile",isAuthenticated,updateProfile);

router.delete("/delete/me", isAuthenticated, deleteUser)

router.get("/user/",isAuthenticated,myProfile);

router.get("/user/posts", isAuthenticated, getPosts)

router.get("/user/posts/:id", isAuthenticated, getUserPosts)



router.post("/forgot/password",forgotPassword);

router.put("/password/reset/:token",resetPassword);


// user is not logged in
router.post("/register" , registerUser);

router.post("/login", loginUser)

router.get("/users",getAllUsers)

router.get("/getFeedData", getFeedData)

router.get("/getLatestPosts",getLatestPosts)

router.get("/user/:id",getUserProfile);





module.exports=router