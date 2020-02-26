//Node
const express = require("express");
const path = require('path');
var exphbs  = require('express-handlebars');

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

app.use('/api/members', require('./routes/api/members'));

app.listen(PORT, () => console.log(`server started on port ${PORT}`));