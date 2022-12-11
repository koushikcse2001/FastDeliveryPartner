var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { engine } = require('express-handlebars');
const fileUpload = require('express-fileupload');
//router require
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersAdmin = require('./routes/admin');
require('./config/DataBase');
// const env=require("dotenv");
// env.config();

var app = express();
//file Upload
app.use(fileUpload());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('.hbs', engine(
  {
    extname: '.hbs',
    defaultView: "forentend/index",
    layoutsDir: __dirname + '/views/layout',
    defaultLayout: "frontend/layout",
    partialsDir: __dirname + '/views/partials'
  }
)
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//use of page
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', usersAdmin);

// catch 404 and forward to error handler
app.get("*",(rea,res)=>{

  if (error) {
    res.render('../view/error.hbs');
  }
  res.json({error:"Page not found!!!!"});
})

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT, () => {
console.log("Example app listening on port");
});

module.exports = app;
