class Page {
  constructor (url, browser) {
    this.browser = browser
    this.url = url
  }
  async goto () {
    await this.browser.get(this.url)
  }
}

module.exports = Page
