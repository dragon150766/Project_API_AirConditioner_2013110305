var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/index');
const passport = require("passport")

var userRouter = require('./routes/user');
var staffRouter = require('./routes/staff')
var productRouter = require('./routes/product');

const errorHandler = require('./middleware/errorHandler')


var app = express();

mongoose.connect(config.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

app.use(logger('dev'));
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize())

app.use('/user', userRouter);
app.use('/staff', staffRouter);
app.use('/product',productRouter);

app.use(errorHandler);



module.exports = app;