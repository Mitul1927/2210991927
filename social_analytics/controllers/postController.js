const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();
const BASE_URL = process.env.BASE_URL;
const TOKEN = process.env.token;
const authHeader = {
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  };  
module.exports.getPosts = async (req, res) => {
    try {
        const { type } = req.query;
        const { data: users } = await axios.get(`${BASE_URL}/users`,authHeader);
        let allPosts = [];
    
        // for (const user of users) {
        //   const { data: posts } = await axios.get(`${BASE_URL}/users/${user.id}/posts`);
        //   allPosts.push(...posts);
        // }
        for(const user in users.users){
            const {data : posts} = await axios.get(`${BASE_URL}/users/${user}/posts`,authHeader);
            const postss  = posts.posts;
            allPosts.push(...postss);
        }
    
        if (type === "popular") {
          for (const post of allPosts) {
            const { data: comments } = await axios.get(`${BASE_URL}/posts/${post.id}/comments`,authHeader);
            post.commentCount = comments.comments.length;
          }
          allPosts.sort((a, b) => b.commentCount - a.commentCount);
          
        } else {
          allPosts.sort((a, b) => b.id - a.id); // assuming latest = highest ID
          const returnPosts = allPosts.slice(0,5);
          return res.json(returnPosts);
        }
        const returnPosts = [];
        let topPost = allPosts[0].commentCount;
        for(let post of allPosts){
            if(post.commentCount==topPost){
                returnPosts.push(post);
            }else{
                break; 
            }
        }
        return res.json(returnPosts);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
      }
  };