const express = require("express");
const isAuth = require("../middleware/isAuth.js");
const { multipartHandler } = require("../middleware/multipartHandler");
const { getUserIdByUsername, 
        getUserInfo, 
        getProfilePic,
        uploadProfilePic,
        addFollower,
        removeFollower,
        getFollowers,
        getFollowing,
        checkIsFollowing,
        getClientUser} = require("../controllers/users.js");

const usersRouter = express.Router();
usersRouter.get("/getClientUser", isAuth, getClientUser);
usersRouter.get("/getUserId/:username", getUserIdByUsername);
usersRouter.get("/:userid/UserInfo", getUserInfo);
usersRouter.get("/:userid/profilepic", getProfilePic);
usersRouter.put("/uploadProfilePic", isAuth, multipartHandler, uploadProfilePic);
usersRouter.post('/addFollower', isAuth, addFollower);
usersRouter.delete('/removeFollower/:userID_two', isAuth, removeFollower);
usersRouter.get('/:userID/getFollowers', getFollowers);
usersRouter.get('/:userID/getFollowing', getFollowing);
usersRouter.get('/checkIsFollowing/:userID_two', isAuth, checkIsFollowing);

module.exports = { usersRouter };