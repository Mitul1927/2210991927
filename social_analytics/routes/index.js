const express = require('express');
const {getTopUsers} = require('../controllers/userController');
const {getPosts} = require('../controllers/postController');


const router = express.Router();
router.get('/',(req,res)=>res.send("hello world")  )
router.get('/users',getTopUsers);
router.get('/posts',getPosts);

module.exports = router;