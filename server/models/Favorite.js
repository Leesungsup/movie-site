const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");
const { Schema } = require('mongoose');

const favoriteSchema = mongoose.Schema({
    userFrom: {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    movieId:{
        type:String
    },
    movieTitle:{
        type:String
    },
    moviePost:{
        type:String
    },
    movieRunTime:{
        type:String
    }
},{timestamps:true})


const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }