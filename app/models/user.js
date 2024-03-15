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
    verifyToken: {
        type: String,
        default: '',
    },
    verifyTokenExpiry: {
        type: Date,
        default: new Date(0),
    }
    
}, {

  collection: 'users'

});

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
