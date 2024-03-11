import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "Please provide username"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
    
}, {

  collection: 'users'

});

const User = mongoose.model('users', userSchema);

export default User;
