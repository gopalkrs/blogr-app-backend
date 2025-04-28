import mongoose from 'mongoose';

const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  content: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to the User model
  date: { type: Date, default: Date.now },
});


const userSchema = new Schema({
    email: String, // String is shorthand for {type: String}
    name: String,
    role: String,
    hashedPassword: String
});

const User = mongoose.model('User', userSchema);
const Blog = mongoose.model('Blog', blogSchema);

export { User, Blog };
