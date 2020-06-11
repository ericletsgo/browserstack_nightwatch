const { username, pw, browserStackUser, browserStackKey } = require( '../../credentials' );
const axios = require( 'axios' );

module.exports = {
  'Step 1: Navigate to browserstack sign in page': function( browser ) {
    browser
      .url( 'https://www.browserstack.com/users/sign_in' )
      .waitForElementVisible( 'body' )
      .assert.titleContains( 'BrowserStack' );
  },
  'Step 2: Accept cookies if shown': function( browser ) {
    browser.element( 'id', 'accept-cookie-notification', function( result ) {
      if ( result.value && result.value.ELEMENT ) {
        browser
          .useXpath()
          .click( 'id', 'accept-cookie-notification' )
          .useCss()
      }
    });
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
      .waitForElementVisible( '#skip-local-installation', false )
      .click( 'id', 'skip-local-installation' )
  },
  'Step 5: select configuration': function( browser ) {
    browser
      .useXpath()
      .waitForElementVisible( '//*[@id="rf-os-list-wrapper"]/nav/ul/ul[2]/li' )
      .click( '//*[@id="rf-os-list-wrapper"]/nav/ul/ul[2]/li' )
      .assert.visible( '//*[@id="rf-os-list-wrapper"]/nav/ul/ul[2]/ul/li[1]/span' )
      .click( '//*[@id="rf-os-list-wrapper"]/nav/ul/ul[2]/ul/li[1]/span' )
      .assert.visible( '//*[@id="rf-browsers"]/div/div[2]/div[3]/ul/li[1]/a' )
      .click( '//*[@id="rf-browsers"]/div/div[2]/div[3]/ul/li[1]/a' )
      .useCss()
  },
  'Step 6: wait for Chrome session to load': function( browser ) {
    browser
      .pause( 30 * 1000 )
  },
  'Step 7: select active element and search for browserstack and PUT to browserstack API': function( browser ) {
    let sessionId;

    browser
      .session( function ( session ) {
        sessionId = session.sessionId;
      })
      .elementActive( function ( result ) {
        browser
          .elementIdAttribute( result.value.ELEMENT, 'id', function ( nodeID ) {
            browser
              .setValue( 'id', nodeID.value, 'browserstack' )
              .keys( browser.Keys.ENTER, function ( result ) {
                if ( result.state == 'success' ) {
                  axios.put( `https://${browserStackUser}:${browserStackKey}@api.browserstack.com/automate/sessions/${sessionId}.json`, {  
                    'status': 'PASSED',
                  })
                  .then( () => console.log( 'Test SUCCESSFUL; Test marked as PASSED' ) )
                  .catch( err => console.log( 'Test SUCCESSFUL; Test did NOT mark as PASSED\n' + err ) );
                } else {
                  axios.put( `https://${browserStackUser}:${browserStackKey}@api.browserstack.com/automate/sessions/${sessionId}.json`, {
                    'status': 'FAILED',
                    'reason': err,
                  })
                  .then( () => console.log( 'Test FAILED; Test marked as FAILED' ) )
                  .catch( err => console.log( 'Test FAILED; Test did NOT mark as FAILED\n' + err ) );
                }
              })
              .pause( 5 * 1000 )
              .end();
          })
      })
  },
}