const express = require('express');
const router = express.Router();
//const uuid = require('uuid');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vehicleSchema = new Schema({
    uniqueId: String,
    make: String, 
    fuel_type: String,
    aspiration: String,
    num_of_doors: String,
    body_style: String,
    drive_wheels: String,
    engine_location: String,
    wheel_base: String,
    length: String,
    width: String,
    heigth: String,
    curb_weight: String,
    engine_type: String,
    num_of_cylinders:String,
    engine_size: String,
    fuel_system: String,
    bore: String,
    stroke: String,
    compression_ratio: String,
    horsepower: String,
    peak_rpm: String,
    city_mpg: String,
    highway_mpg: String,
    price: String
});


var VehicleData = mongoose.model('VehicleData', vehicleSchema,'Vehicles');

router.get('/', (req, res)=>{
    //res.json(members);
    VehicleData.find().then(e => {
      res.json(e);
    });
});



module.exports = router;