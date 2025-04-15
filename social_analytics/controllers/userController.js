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

module.exports.getTopUsers = async (req, res) => {
    try {
        const { data: users } = await axios.get(`${BASE_URL}/users`,authHeader);
        // console.log(users);
        const userCommentCounts = [];
    
        for (const user in users.users) {
          const { data: posts } = await axios.get(`${BASE_URL}/users/${user}/posts`,authHeader);
        // const keys = Object.keys(users.users);

        // keys.forEach(key => {
        // console.log(key);
        // });

     
          let totalComments = 0;
          for (const post of posts.posts) {
            const { data: comments } = await axios.get(`${BASE_URL}/posts/${post.id}/comments`,authHeader);
            totalComments += comments.comments.length;
          }
    
          userCommentCounts.push({
            id: user,
            name: users.users[user],
            commentCount: totalComments,
          });
        }
    
        userCommentCounts.sort((a, b) => b.commentCount - a.commentCount);
        const topFiveUsers = userCommentCounts.slice(0, 5);
        res.json(topFiveUsers);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
      }
};