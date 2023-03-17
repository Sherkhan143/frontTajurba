const express = require('express');
const Routes = require('./routes/routes.js');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');
const path = require('path');
const hbs = require('hbs');
const port = process.env.PORT || 3002;


const rootPath = path.join(__dirname, '../');

const app = express();

app.use(express.static(rootPath));
app.use(bodyParser.urlencoded({ extended: true }));

//  static things path 
app.use('/static', express.static('public'));

app.set('view engine', 'hbs');
app.set('views', 'views');
hbs.registerPartials('views/partials');

app.use('/', Routes);

app.listen(port, function () {
    console.log("server started at 3002");
})


