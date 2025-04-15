const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.port || 3000;
const cors = require('cors');
const routes = require('./routes/index');
// app.use(cors({ origin: ,credentials:true }));
app.use(express.json());
app.use(cors({ origin:`http://localhost:${port}/` ,credentials:true }));

app.use('/',routes);
// app.get('/',(req,res)=>{
//     res.send('hello world');
// })
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
