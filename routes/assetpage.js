const express = require('express');
const router = express.Router();
const session = require('express-session');
const asset = require('../models/assetModel');
const crypto = require('crypto');




router.get('/', (req, res)=> {
  
   sess = req.session;
   productId=sess.productId;
      
   asset.find({ productId },(err, docs) => {
       if (!err) {
           res.render('assetadmin', {
               data: docs
           });
       } else {
           console.log('Failed to retrieve the Course List: ' + err);
       }
   });

});


  // --------------------------------------------------
module.exports=router;