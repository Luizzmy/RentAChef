require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const passport     = require('passport')


const session      = require('express-session')
const MongoStore   = require('connect-mongo')(session)
const flash        = require('connect-flash')

mongoose
  .connect(process.env.DB || 'mongodb://localhost/rentachef', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//THE ORDER OF THESE LINES ARE IMPORTANT
require('./configs/session')(app)
app.use(passport.initialize())
app.use(passport.session())


// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
// app.use(express.static('views/images')); 

app.use(function (req, res, next) {
  if(req.user){
    app.locals.session = true;
  }
  else{
    app.locals.session=false
  }
    next();
});


// default value for title local
app.locals.title = 'RentAChef';





const index = require('./routes/index');
const events=require('./routes/events')
const auth = require('./routes/auth')
app.use('/', auth)
app.use(flash())

app.use('/', index);
app.use('/events', events)

module.exports = app;
