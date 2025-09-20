import mongoose from 'mongoose';

const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  content: String,
  imageUrl: String,
  category: String,
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to the User model
  date: { type: Date, default: Date.now },
  tags: [String],
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: [{ 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comment: String,
    date: { type: Date, default: Date.now }
  }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});


const userSchema = new Schema({
    email: String, // String is shorthand for {type: String}
    name: String,
    role: String,
    hashedPassword: String,
    bio: String,
});

const likeSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
    date: { type: Date, default: Date.now },
});

const newsletterSchema = new Schema({
  email: String,
  date: { type: Date, default: Date.now },
})

const User = mongoose.model('User', userSchema);
const Blog = mongoose.model('Blog', blogSchema);
const Like = mongoose.model('Like', likeSchema);
const Newsletter = mongoose.model('Newsletter', newsletterSchema);


export { User, Blog, Like, Newsletter };
