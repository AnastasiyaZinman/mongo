var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/BooksReviews');
var Schema = mongoose.Schema;
var bookSchema = new Schema({
    title: String,
    author: String,
    reviews: [{ type: Schema.Types.ObjectId, ref: 'review' }]
});

var criticSchema = new Schema({
    name: String,
    reviews: [{ type: Schema.Types.ObjectId, ref: 'review' }]
});

var reviewSchema = new Schema({
    reviewText: String,
    book: { type: Schema.Types.ObjectId, ref: 'book' },
    critic: { type: Schema.Types.ObjectId, ref: 'critic' }
});
var Book = mongoose.model("book", bookSchema);
var Review = mongoose.model("review", reviewSchema);
var Critic = mongoose.model("critic", criticSchema);

var critic1 = new Critic({
    name: "Critic 1",
    reviews: []
});

var book1 = new Book({
    title: "Book 1",
    author: "Author 1",
    reviews: []
});

var review = new Review({
    book: book1._id,
    critic: critic1._id,
    reviewText: "Excellent Book"
});

review.save();
book1.reviews.push(review);
critic1.reviews.push(review);

book1.save();
critic1.save();
Book.findOne({title:"Book 1"}).populate('reviews').exec(function(err, answer){
    if (err) throw err;
    else 
    console.log(answer)
})
Book.findOne({ title: "Book 1" }).populate({
    path: 'reviews',
    populate: {
      path: 'critic'
    }
  }).exec(function(err, book) {
    console.log(err);
    console.log(book.reviews[0].critic)
  })
  Critic.findOne({ name: "Critic 1" }).populate({
    path: 'reviews',
    populate: {
      path: 'book'
    }
  }).exec(function(err, critic) {
    console.log(err);
    console.log(critic.reviews[0].book);
  });

  Review.find({}).populate('critic book').exec(function(err, review){
    console.log(review[0]);
  });

//   For instance, let's populate a critic's reviews array, but only with the review text. Simple:

Critic.findOne({name:"Critic 1"}).populate('reviews','reviewText').exec(function(err, critic){
  console.log(critic.reviews);
});
// The syntax is pretty simple. Just add a comma, and then in the next string add all the fields you want to return. Try it and be impressed!
// Book.findOne({title:"Book 1"}, function(err, book){
//     console.log(book)
//   })

