const Page = require('./Page')

const url = '/logout'

class LogoutPage extends Page {
  constructor () {
    super(url)
  }
}

module.exports = new LogoutPage()
