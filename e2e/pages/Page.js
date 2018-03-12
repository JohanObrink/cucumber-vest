const {URL} = require('url')
const {client} = require('nightwatch-cucumber')
const nconf = require('nconf').env({lowerCase: true, separator: '_'})
const {host} = nconf.get('web')

class Page {
  constructor (url) {
    this.url = new URL(url, host).href
    this.adminMenu = 'nav ul li.admin'
  }
  async goto () {
    await client.url(this.url).waitForElementVisible('body', 1000)
  }
}

module.exports = Page
