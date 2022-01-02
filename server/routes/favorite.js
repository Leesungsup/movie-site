const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");


//=================================
//             Favorite
//=================================

router.post('/number',(req,res)=>{
    Favorite.find({"movieId":req.body.movieId})
    .exec((err,Info)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({success:true, favoriteNumber:Info.length})
    })
})
router.post('/favorited',(req,res)=>{
    Favorite.find({"movieId":req.body.movieId, "userFrom":req.body.userFrom})
    .exec((err,Info)=>{
        if(err) return res.status(400).send(err)
        let result=false
        if(Info.length!=0){
            result=true
        }
        res.status(200).json({success:true, favorited:result})
    })
})
router.post('/removeFromFavorite',(req,res)=>{
    Favorite.findOneAndDelete({movieId:req.body.movieId,userFrom:req.body.userFrom})
    .exec((err,doc)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({success:true,doc})
    })
})
router.post('/addToFavorite',(req,res)=>{
    const favorite = new Favorite(req.body)
    favorite.save((err,doc)=>{
        if (err) res.status(400).send(err)
        res.status(200).json({success:true,})
    })
})
module.exports = router;
