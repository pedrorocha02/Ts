
// Account information
// Change this whenever you want to test with a different account
const USERNAME = 'John'
const EMAIL = 'dedeb92639@eachart.com'

// IMDb uses forces a manual check for some actions
// set to true to make answer them and not break the test
const MANUAL_CHECK = false

// The following can stay as they are

const EMAIL_WRONG = 'not_an_email'
const EMAIL_NO_ACCOUNT = 'not_an_email@no_account.com'

const PASSWORD_CORRECT = 'eJuj9F&yWZK5o'
const PASSWORD_WRONG = 'sTyk9G/wFGH6p'
const PASSWORD_SHORT = '1234'

export default { USERNAME, EMAIL, EMAIL_NO_ACCOUNT, EMAIL_WRONG, PASSWORD_CORRECT, PASSWORD_WRONG, PASSWORD_SHORT, MANUAL_CHECK }