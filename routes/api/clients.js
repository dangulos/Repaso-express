const express = require('express');
const router = express.Router();
//const uuid = require('uuid');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = new Schema({
    dateSet: String,
    lastname: String,
    name: String,
    phoneNumber: String,
    uniqueId: String
});

//Model

var ClientData = mongoose.model('ClientData', clientSchema,'Clients');

//Check
const members = require('../../members.js');

router.get('/', (req, res)=>{
    //res.json(members);
    ClientData.find().then(e => {
      res.json(e);
    });
});

router.get('/:id', (req,res)=>{
    ClientData.findOne({'uniqueId': req.params.id} ,(err, doc)=>{
      if(err){
        console.error('no entry found');
      }
      res.json(doc);
    });

});

router.post('/', (req, res)=>{
    const newMember = {
        dateSet: req.body.dateSet,
        lastname: req.body.lastname,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        uniqueId: req.body.uniqueId
    };
    
    if(!newMember.name || !newMember.email){
        res.status(400).json({msg:`invalid format`});
    }else{
        var data = new ClientData(newMember);
        data.save();
        res.redirect("/api/clients/");
    }
});

router.put('/:id', (req, res) => {
  ClientData.findById(req.params.id, (err, doc)=>{
      if(err){
        console.error('no entry found');
      }
      doc.dateSet = req.body.dateSet;
      doc.lastname = req.body.lastname;
      doc.name = req.body.name;
      doc.phoneNumber = req.body.phoneNumber;
      doc.uniqueId = req.body.uniqueId;
      res.json(doc);
    });
    res.redirect("/api/clients/");
});

router.delete('/:id', (req, res) => {
  ClientData.findOneAndDelete({'uniqueId': req.params.id}).exec();
  res.redirect("/api/clients/");
});


module.exports = router;