//Node
const express = require("express");
const path = require('path');
const exphbs  = require('express-handlebars');
//mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/examen', {useNewUrlParser: true, useUnifiedTopology: true});



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Mongo: connection established");
});

//Check
const members = require('./members.js');

//middleware
const logger = require('./middleware/logger.js');

const app = express();

const PORT = 5000 || process.env.PORT ;

//middleware
//logger
app.use(logger);
//parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/',(req,res)=> res.render('index', {
    title:'Member app',
    members
}));

//static
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/clients', require('./routes/api/clients'));
app.use('/api/vehicles', require('./routes/api/vehicles'));
app.use('/api/sales', require('./routes/api/sales'));

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

//commentaries