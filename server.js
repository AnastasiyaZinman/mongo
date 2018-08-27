var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Posts');
var Schema = mongoose.Schema;
var commentSchema = new Schema({
    text: String,
    username: String,
  })
  
  var postSchema = new Schema({
    text: String,
    username: String,
    comments: [{type: Schema.Types.ObjectId, ref: 'review'}]
  })
  
  var Post = mongoose.model('Post', postSchema)
  
  var aPost = new Post({ username: "Brandon", text: "My first post!!!" });
  
  aPost.comments.push({ username: "Bob", text: "Great Post!" });
  
  aPost.save(function(err, data) {
    if (err) {
      console.error(err);
    } else {
      console.error(data);
    }
  });
  