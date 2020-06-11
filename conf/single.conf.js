const { browserStackUser, browserStackKey } = require( '../credentials' );

nightwatch_config = {
  src_folders: [ "tests/single" ],

  selenium: {
    "start_process" : false,
    "host": "hub-cloud.browserstack.com",
    "port": 80
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        'browserstack.user': browserStackUser,
        'browserstack.key': browserStackKey,
        'browser': 'chrome',
        'os': 'OS X',
        'os_version': 'Catalina',
        'name': 'Bstack-[Nightwatch] Sample Test'
      },
    }
  }
};

for(var i in nightwatch_config.test_settings){
  var config = nightwatch_config.test_settings[i];
  config['selenium_host'] = nightwatch_config.selenium.host;
  config['selenium_port'] = nightwatch_config.selenium.port;
}

module.exports = nightwatch_config;