const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
    poster_path: { type: String, required: true },
    name: { type: String, required: true },
    id: { type: String, required: true }
});


const schemaRules = {
    name :{
        type: String,
        required: [true,"name is required"],
    },

    email :{
        type: String,
        required: [true,"email is required"],
        unique: [true,"email must be unique"],
    },
    password :{
        type: String,
        required: [true,"password is required"],
        minLength: [6,"password must be at least 6 characters long"],
    },
    confirmPassword :{
        type: String,
        required: [true,"confirm password is required"],
        minLength: [6,"confirm password must be at least 6 characters long and must match password"],

        validate :[function() {
            return this.password === this.confirmPassword;

        } ,"confirm password must match password"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['user', 'admin','feed curator','moderator'],
        default: 'user'
        
    },
       otp: {
        type: String,
    },

    otpExpiry:{
        type: Date,

    },
    isPremium: {
        type: Boolean,
        default: false
    },
    wishlist: [wishlistItemSchema],

}



const userSchema = new mongoose.Schema(schemaRules);

userSchema.pre('save', function(next) {

    this.confirmPassword = undefined; 
    next();
})

userSchema.post('save', function(){
    this.__v = undefined; 
    this.password = undefined;
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;