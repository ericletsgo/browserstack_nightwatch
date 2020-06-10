const { Builder, By, Key, until } = require( 'selenium-webdriver' );
const chrome = require( 'selenium-webdriver/chrome' );
const chromedriver = require( 'chromedriver' );
const axios = require ( 'axios' );

const { username, pw, browserStackUser, browserStackKey } = require( './credentials' );

chrome.setDefaultService( new chrome.ServiceBuilder( chromedriver.path ).build() );

module.exports.browserstackInception = async function() {
  var capabilities = {
    'browserName' : 'Chrome',
    'browser_version' : '83.0',
    'os' : 'OS X',
    'os_version' : 'Catalina',
    'resolution' : '1920x1080',
    'browserstack.user' : browserStackUser,
    'browserstack.key' : browserStackKey,
    'name' : 'Selenium_Inception',
    'browserstack.console' : 'verbose',
  }

  let driver = await new Builder().
    usingServer( 'http://hub-cloud.browserstack.com/wd/hub' ).
    withCapabilities( capabilities ).
    build();

  // let driver = new Builder().forBrowser('chrome').build();

  const delay = timeToWait => new Promise( resolve => setTimeout( resolve, timeToWait ) );

  let baseUrl = 'https://www.browserstack.com/users/sign_in'; 

  let sessionId = ( await driver.getSession() ).getId();

  try {
    await driver.get( baseUrl );
    await driver.findElement( By.id( 'accept-cookie-notification' ) ).click();
    
    //Get the Web Element corresponding to the field Business Email (Textfield)
    let email = driver.findElement( By.id( 'user_email_login' ) );
    
    //Get the Web Element corresponding to the Password Field 
    let password = driver.findElement( By.id( 'user_password' ) );
    
    await email.sendKeys( username );
    await password.sendKeys( pw, Key.RETURN );
    
    await driver.wait( until.elementLocated( By.id( 'close-cross' ) ) );
    await driver.findElement( By.id( 'skip-local-installation' ) ).click();

    await driver.wait( until.elementLocated( By.xpath( '//*[@id="rf-os-list-wrapper"]/nav/ul/ul[2]/li' ) ) );
    await driver.findElement( By.xpath( '//*[@id="rf-os-list-wrapper"]/nav/ul/ul[2]/li' ) ).click();

    await driver.wait( until.elementLocated( By.xpath( '//*[@id="rf-os-list-wrapper"]/nav/ul/ul[2]/ul/li[1]/span' ) ) );
    await driver.findElement( By.xpath( '//*[@id="rf-os-list-wrapper"]/nav/ul/ul[2]/ul/li[1]/span' ) ).click();

    await driver.wait( until.elementLocated( By.xpath( '//*[@id="rf-browsers"]/div/div[2]/div[3]/ul/li[1]/a/span' ) ) );
    await driver.findElement( By.xpath( '//*[@id="rf-browsers"]/div/div[2]/div[3]/ul/li[1]/a/span' ) ).click();

    await delay( 30 * 1000 );
    await driver.switchTo().activeElement().sendKeys( 'browserstack', Key.ENTER );
    
    await axios.put( `https://${browserStackUser}:${browserStackKey}@api.browserstack.com/automate/sessions/${sessionId}.json`, {
      'status': 'PASSED',
    })
    .then( () => console.log( 'Test SUCCESSFUL; Test marked as PASSED' ) )
    .catch( err => console.log( 'Test SUCCESSFUL; Test did NOT mark as PASSED\n' + err ) );
  }
  catch ( err ) {
    await axios.put( `https://${browserStackUser}:${browserStackKey}@api.browserstack.com/automate/sessions/${sessionId}.json`, {
      'status': 'FAILED',
      'reason': err,
    })
    .then( () => console.log( 'Test FAILED; Test marked as FAILED' ) )
    .catch( err => console.log( 'Test FAILED; Test did NOT mark as FAILED\n' + err ) );
  }
  finally {
    await delay( 5 * 1000 );
    await driver.quit();
  }
};

this.browserstackInception();