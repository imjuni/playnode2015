var path = require('path');
var java = require('java');

java.asyncOptions = {
  asyncSuffix: undefined,     // Don't generate node-style methods taking callbacks
  syncSuffix: "Sync",              // Sync methods use the base name(!!)
  promiseSuffix: "Promise",   // Generate methods returning promises, using the suffix Promise.
  promisify: require("when/node").lift
};

java.classpath.push(path.join(__dirname, '..', 'java', 'jar', 'jdbc-wrapper-1.0-SNAPSHOT.jar'));

console.log(path.join(__dirname, '..', 'java', 'jar', 'jdbc-wrapper-1.0-SNAPSHOT.jar'));

module.exports.getJava = function getJava () {
  return java;
};
