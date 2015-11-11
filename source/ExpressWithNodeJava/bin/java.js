var path = require('path');
var co = require('co');
var java = require('../lib/NodeJava').getJava();

var jdbcWrapper = java.newInstanceSync('com.imjuni.jdbc.JdbcWrapper');
var helloWorld = jdbcWrapper.getHelloWorldSync();

console.log(helloWorld);

co(function* () {
  var jdbcWrapperEx = yield java.newInstancePromise('com.imjuni.jdbc.JdbcWrapper');
  var helloWorldEx = yield jdbcWrapperEx.getHelloWorldPromise();

  var longlong = yield jdbcWrapperEx.longRunTaskPromise();

  console.log(longlong);

  return longlong;
}).then(function (longlong) {
  console.log('Ex: ' + longlong);
}).catch(function (err) {
  console.log(err.message);
  console.log(err.stack);
});


