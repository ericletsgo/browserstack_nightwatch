const { browserStackUser, browserStackKey } = require( '../credentials' );

nightwatch_config = {
  src_folders : [ "tests/*" ],

  selenium : {
    "start_process" : false,
    "host" : "hub-cloud.browserstack.com",
    "port" : 80
  },

  common_capabilities: {
    'browserstack.user': browserStackUser,
    'browserstack.key': browserStackKey,
    'name': 'Inception-[Nightwatch] Parallel Test'
  },

  test_settings: {
    default: {},
    chrome: {
      desiredCapabilities: {
        browser: "chrome",
        os: 'OS X',
        os_version: 'Catalina'
      }
    },
    firefox: {
      desiredCapabilities: {
        browser: "firefox",
        os: 'OS X',
        os_version: 'Catalina'
      }
    },
    ie: {
      desiredCapabilities: {
        browser: "internet explorer",
        os: 'windows',
        os_version: '10'
      }
    }
  }
};

for( let i in nightwatch_config.test_settings ){
  let config = nightwatch_config.test_settings[ i ];
  config[ 'selenium_host' ] = nightwatch_config.selenium.host;
  config[ 'selenium_port' ] = nightwatch_config.selenium.port;
  config[ 'desiredCapabilities' ] = config[ 'desiredCapabilities' ] || {};
  for( let j in nightwatch_config.common_capabilities ){
    config[ 'desiredCapabilities' ][ j ] = config[ 'desiredCapabilities' ][ j ] || nightwatch_config.common_capabilities[ j ];
  }
}

module.exports = nightwatch_config;