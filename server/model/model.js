const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')


const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        unique:true,
        required:true,
        
    },
    gender:String,
    status:String
});


const Userdb = mongoose.model('userdb',schema)

module.exports = Userdb