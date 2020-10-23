cordova.define("mo-force-app-close.plugin", function(require, exports, module) {

var exec = require('cordova/exec');

var PLUGIN_NAME = 'MOForceAppClose';

var MOForceAppClose = {
  forceAppClose: function(phrase, cb) {
    exec(cb, null, PLUGIN_NAME, 'forceAppClose', [phrase]);
  }
};

module.exports = MOForceAppClose;

});
