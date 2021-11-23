const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: { type: String, unique: 'El email ya esta en uso.' },
    role: String,
    username: String,
    googleId: String,
    facebookId: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;