const Page = require('./Page')

const url = '/welcome'

class WelcomePage extends Page {
  constructor () {
    super(url)

    this.greeting = 'h1'
  }
}

module.exports = new WelcomePage()
