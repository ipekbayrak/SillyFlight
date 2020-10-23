cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-admobpro.AdMob",
    "file": "plugins/cordova-plugin-admobpro/www/AdMob.js",
    "pluginId": "cordova-plugin-admobpro",
    "clobbers": [
      "window.AdMob"
    ]
  },
  {
    "id": "cordova.custom.plugins.exitapp.exitApp",
    "file": "plugins/cordova.custom.plugins.exitapp/www/ExitApp.js",
    "pluginId": "cordova.custom.plugins.exitapp",
    "merges": [
      "navigator.app"
    ]
  },
  {
    "id": "mo-force-app-close.plugin",
    "file": "plugins/mo-force-app-close/www/plugin.js",
    "pluginId": "mo-force-app-close",
    "clobbers": [
      "MOForceAppClose"
    ],
    "runs": true
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-extension": "1.5.2",
  "cordova-plugin-admobpro": "2.29.27",
  "cordova-plugin-whitelist": "1.3.2",
  "cordova.custom.plugins.exitapp": "1.0.0",
  "mo-force-app-close": "1.0.0"
};
// BOTTOM OF METADATA
});