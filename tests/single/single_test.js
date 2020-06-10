const { username, pw } = require( '../../credentials' );

module.exports = {
  'Step 1: Navigate to browserstack sign in page': function( browser ) {
    browser
      .url( 'https://www.browserstack.com/users/sign_in' )
      .waitForElementVisible( 'body' )
      .assert.titleContains( 'BrowserStack' );
  },
  'Step 2: Accept cookies if shown': function( browser ) {
    browser
      .useXpath()
      // .assert.visible( '//*[@id="accept-cookie-notification"]', 5 * 1000)
      .click( '//*[@id="accept-cookie-notification"]' )
      .useCss()
  },
  'Step 3: input login credentials and submit': function( browser ) {
    browser
      .assert.visible( 'input[id=user_email_login]' )
      .setValue( 'input[id=user_email_login]', username )
      .assert.visible( 'input[type=password]' )
      .setValue( 'input[type=password]', pw )
      .assert.visible( 'input[id=user_submit]' )
      .click( 'input[id=user_submit]' )
  },
  'Step 4: close local testing popup': function( browser ) {
    browser
      .useXpath()
      .waitForElementVisible( '//*[@id=close]' )
      .click( '//*[@id=close]' )
      .useCss()
  },
  'Step 5: click mac os': function( browser ) {
    browser
      .waitForElementVisible( 'section' )
  },
  'Step 6: click catalina': function( broser ) {

  },
  'Step 7: click Chrome verson 83.0': function( browser ) {

  },
  'Step 8: wait 30 seconds for Chrome session to load': function( browser ) {

  },
  'Step 9: select active element and search for browserstack': function( browser ) {

  },
  'Step 10: PUT test results to browserstack API': function( browser ) {

  }
}