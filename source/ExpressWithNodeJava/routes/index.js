var co = require('co');
var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/simple', function (req, res) {
  try {
    var java = require('../lib/NodeJava').getJava();
    var jdbcWrapper = java.newInstanceSync('com.imjuni.jdbc.JdbcWrapper');

    console.log(jdbcWrapper);
    var helloWorld = jdbcWrapper.getHelloWorldSync();

    res.json({
      ret: true,
      message: helloWorld
    });
  } catch (err) {
    console.log(err.message);
    console.log(err.stack);

    res.json({
      ret: true,
      message: err.message
    });
  }
});

router.get('/long', function (req, res) {
  var java = require('../lib/NodeJava').getJava();
  var jdbcWrapper = java.newInstanceSync('com.imjuni.jdbc.JdbcWrapper');

  try {
    var helloWorld = jdbcWrapper.getHelloWorldSync();
    var longlong = jdbcWrapper.longRunTaskSync();

    console.log(helloWorld);

    res.json({
      ret: true,
      message: longlong
    });
  } catch (err) {
    console.log(err.message);
    console.log(err.stack);

    res.json({
      ret: true,
      message: err.message
    });
  }
});

router.get('/long_async', function (req, res) {
  var java = require('../lib/NodeJava').getJava();

  co(function* () {
    var jdbcWrapper = yield java.newInstancePromise('com.imjuni.jdbc.JdbcWrapper');
    var longlong = yield jdbcWrapper.longRunTaskPromise();

    console.log(longlong);

    return longlong;
  }).then(function (longlong) {
    res.json({
      ret: true,
      message: longlong
    });
  }).catch(function (err) {
    console.log(err.message);
    console.log(err.stack);

    res.json({
      ret: true,
      message: err.message
    });
  });
});

module.exports = router;
