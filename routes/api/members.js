const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberSchema = new Schema({
    name: String,
    email: String,
    status: String
});

//Model

var MemberData = mongoose.model('MemberData', memberSchema);

//Check
const members = require('../../members.js');

router.get('/', (req, res)=>{
    //res.json(members);
    MemberData.find().then(e => {
      res.json(e);
    });
});

router.get('/:id', (req,res)=>{
    MemberData.findById(req.params.id, (err, doc)=>{
      if(err){
        console.error('no entry found');
      }
      res.json(doc);
    });

});

router.post('/', (req, res)=>{
    const newMember = {
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };
    
    if(!newMember.name || !newMember.email){
        res.status(400).json({msg:`invalid format`});
    }else{
        var data = new MemberData(newMember);
        data.save();
        res.redirect("/api/members/");
    }
});

router.put('/:id', (req, res) => {
  MemberData.findById(req.params.id, (err, doc)=>{
      if(err){
        console.error('no entry found');
      }
      doc.name = req.body.name;
      doc.email = req.body.email;
      doc.status = req.body.status;
      res.json(doc);
    });
    res.redirect("/api/members/");
});

router.delete('/:id', (req, res) => {
  MemberData.findByIdAndRemove(req.params.id).exec();
  res.redirect("/api/members/");
});


module.exports = router;