require('marko/node-require'); // Allow Node.js to require and load `.marko` files

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

var markoExpress = require('marko/express');
app.set('view engine', 'marko');

var template = {
  index: require('./views/index.marko'),
  item: require('./views/item.marko'),
  error: require('./views/error.marko')
};

var api = {
  item: require('./api/item.js'),
  list: require('./api/list.js')
}

var validContentTypes = [
  'news',
  'ask',
  'show',
  'jobs',
  'newest'
]

app.use(markoExpress()); //enable res.marko(template, data)

// http express server to redirect our traffic 
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/item/:id', function(req, res) {
  const item = req.params.id;
  const itemData = api.item.getItem(item);
  itemData.then((data) => {
    console.log(data)
    res.marko(template.item, {
      item: data
    })
  }).catch((err) => {
    console.log(err);
    res.redirect('/error');
  });
});

app.get('/:contentType/:page?', function(req, res) {
  
  let contentType = req.params.contentType;
  // confirm valid content type before going any further.
  if (!validContentTypes.includes(contentType)) {
    res.redirect('/news');
  }

  let page = 1;
  // get optional page # from params and confirm its valid int
  if(req.params.page && parseInt(req.params.page)) {
    page = req.params.page;
  }

  const list = api.list.getList(contentType, page);
  list.then((data) => {
    res.marko(template.index, {
      list: data,
      page: page,
      contentType: contentType
    });
  }).catch((err) => {
    res.redirect('/error');
  })

});

// make /news our homepage
app.get('/', function(req, res) {
  res.redirect('/news');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.marko(template.error, {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.marko(template.error, {
    message: err.message,
    error: {}
  });
});

module.exports = app;
