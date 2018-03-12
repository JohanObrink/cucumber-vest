const {client: browser} = require('nightwatch-cucumber')
const Page = require('./Page')

const url = '/'

class StartPage extends Page {
  constructor () {
    super(url)

    this.loginLink = 'a.login'
  }
}

module.exports = new StartPage()
