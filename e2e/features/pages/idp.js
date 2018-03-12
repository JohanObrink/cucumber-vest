const {By} = require('selenium-webdriver')

const url = '/'

class IDP extends Page {
  async login (username, password) {
    return await this.browser
      .findElement(By.css('a.login'))
  }
}

module.exports = (browser) => new IDP(url, browser)
