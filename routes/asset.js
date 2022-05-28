const express = require('express');
const session = require('express-session');
const router = express.Router();
const flash = require('connect-flash');
const users = require('../models/userModel');
const asset = require('../models/assetModel');
const Joi = require('joi')
const crypto = require('crypto');


//-----------------asset add page-----------------------------------------------------
router.get('/addasset', (req, res, next) => {
    const messages = req.flash();
    res.render('addasset', { messages });
});



router.post('/addasset', (req, res, next) => {
  const assetParams = req.body;
 
  const payload = {

    productId:  assetParams.productId,
    productName:  assetParams.productName,
    productCategory: assetParams.productCategory

  };

  asset.insertMany(payload, (err) => {
    if (err) {
      req.flash('error', ' Product Id already exists.');
      res.redirect('/asset/addasset');
    } 
    else {
      req.flash('success', ' Assets have been successfully added.');
      sess = req.session;
      sess.productId = req.body.productId;
      res.redirect('/asset/addasset');
   
    }
    
  });
    
});

router.get('/useraddasset/:productId', async(req, res) => {


  const id = req.params.productId;  
  
  sess = req.session;
  email=sess.email;

  assets.findOneAndUpdate({productId: id} ,{$set: {'user_email': email}}, function(err, results) {
    
    if (err ) {
      console.log(err);
      req.flash('error', 'error occure.');
      res.redirect('/userassetpage');
    } 
    else {
     
      req.flash('success', ' Assets have been successfully added');
      console.log('success');
   
      if(email.includes('admin')){
        sess = req.session;
        email=sess.email;
      
        res.redirect('/assetpage');
      }
      else{
        sess = req.session;
        email=sess.email;
      
        res.redirect('/userassetpage');
      }
    }
   
  })
   
});

router.get('/userdeleteasset/:productId', function(req, res, next) {
  
  const id = req.params.productId;
  assets.findOneAndUpdate({productId: id} ,{$set: {'user_email':null}}, function(err, results) {
    
    if (err ) {
      console.log(err);
      req.flash('error', 'error occure.');
      res.redirect('/myasset');
    } 
    else {
      sess = req.session;
      email=sess.email;

      req.flash('success', ' Assets have been successfully added');
      console.log('success');
   
      res.redirect('/myasset');
    }
   
  })
})

router.get('/back',(req,res) => {
  req.session.destroy((err) => {
      if(err) {
          return console.log(err);
      }
      res.redirect('/assetpage');
  });

});

module.exports = router;
