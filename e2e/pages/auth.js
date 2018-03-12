const Page = require('./Page')

const url = '/auth'

class AuthPage extends Page {
  constructor () {
    super(url)
  }
}

module.exports = new AuthPage()
