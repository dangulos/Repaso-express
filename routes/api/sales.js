const express = require('express');
const router = express.Router();
//const uuid = require('uuid');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var saleSchema = new Schema({
    client: String,
    vehicle: String,
    date: String,
    paidInFull: String
})

var SaleData = mongoose.model('SaleData', saleSchema,'Sales');

router.get('/', (req, res)=>{
    //res.json(members);
    SaleData.find().then(e => {
      res.json(e);
    });
});



module.exports = router;