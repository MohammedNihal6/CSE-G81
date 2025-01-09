const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})

//static signup method
userSchema.statics.signup = async function(email, password) {
    
    //validation
    if(!email || !password) {
        throw Error("All fields must be filled")
    }
    if(!validator.isEmail(email)) {
        throw Error("Email is not valid!")
    }
    if(!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough!")
    }
    //check if email is already used
    const exists = await this.findOne({ email })

    if(exists) {
        throw Error('Email already in use');
    }

    //in hashing random characters are added and then it is hashed to produce a different has for every password even if the email is the same
    //this random characters are called as 'salt'
    const salt = await bcrypt.genSalt(10)//10 characters
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({email, password: hash })

    return user
}

//static login method
userSchema.statics.login = async function(email, password) {
    
    if(!email || !password) {
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({ email })

    if(!user) {
        throw Error("Incorrect email")
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match) {
        throw Error("Incorrect password")
    }

    return user
}

module.exports = mongoose.model('User', userSchema)