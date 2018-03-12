const {By} = require('selenium-webdriver')

const url = '/'

class StartPage extends Page {
  async loginLink () {
    return await this.browser
      .findElement(By.css('a.login'))
  }
  async greeting () {
    return await this.browser
      .findElement(By.css('h1'))
      .getText()
  }
}

module.exports = (browser) => new StartPage(url, browser)
