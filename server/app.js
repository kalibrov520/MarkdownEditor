const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

const mongoose = require('mongoose');

mongoose.plugin(schema => {
  schema.statics.isObjectId = id => id && /^[0-9a-fA-F]{24}$/.test(id);
});

mongoose.connect('mongodb://localhost/markdown', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PATCH, POST, GET ,DELETE, OPTIONS');
  next();
});

app.use('/', indexRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  const status = !err.status ? 500 : err.status;
  res.status(status)
    .json({
      message: err.message,
      error: req.app.get('env') === 'development' ? err : {},
      status: status
    });
});

module.exports = app;
