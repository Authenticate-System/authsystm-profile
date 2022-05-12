const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const assetModel = new mongoose.Schema({
    // _id: {
    //     type: numberlong(3) ,

    //     required: true
    // },
    productId :{
        type: Number ,
        required: true,
        unique:true

    },
   productName: {
        type: String,
        required: true
    },
    productCategory : {
        type: String,
        required: true
    },
    user_email: {
         type: Schema.Types.ObjectId, ref: 'users' ,
         unique:true
    }
})

const asset =mongoose.model('asset', assetModel);

module.exports = asset;