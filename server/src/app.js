const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose');
const Post = require("../models/post");

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/posts', 
{
  useNewUrlParser: true,
  useUnifiedTopology: true
}
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});
// app.get('/posts', (req, res) => {
//   res.send(
//     [{
//       id:1,
//       votes: [
//         {
//           id: 1,
//           user: 1,
//           created_on:'21/21/12'
//         },
//         {
//           id: 2,
//           user: 22,
//           created_on:'21/21/12'
//         }
//       ],
//       total_votes: 2,
//       data: {
//         id:'1111',
//         title: "BUILD - As a hackathon participant, I want a simple, easy \"how to\" for how hackathons work",
//         description: "Hi there! How are you?",
//         tags: [
//           {
//             id: 1,
//             name:'Hackathon' 
//           },
//           {
//             id: 2,
//             name:'Sprint 19' 
//           }
//         ],
//         created_on:'21/21/12',
//         comments:2
//       }

//     },
//     ]
//   )
// })

app.get('/posts', (req, res) => {
  Post.find({}, 'title description', function (error, posts) {
    if (error) { console.error(error); }
    res.send({
      posts: posts
    })
  }).sort({_id:-1})
})

app.post('/posts', (req, res) => {
  var db = req.db;
  var title = req.body.title;
  var description = req.body.description;
  var votes = req.body.votes;
  var new_post = new Post({
    title: title,
    description: description,
    votes: votes
  })
  
  new_post.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })
})

app.listen(process.env.PORT || 8081)