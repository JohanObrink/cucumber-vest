const {Before, After, Given, When, Then} = require('cucumber')
const {Builder, By, Key, until} = require('selenium-webdriver')
const {expect} = require('chai')
const {clearDb, insertUsers, getPage} = require('./helpers')

const wait = (delay) => new Promise(resolve => setTimeout(resolve, delay))

let browser

Before(async () => {
  await clearDb()
  browser = await new Builder().forBrowser('chrome').build()
  getPage = (pageName) => getPage(browser, pageName)
})

After(async () => {
  await clearDb()
  await browser.quit()
})

Given(/The following users exist in the IDP/, async function (users) {
  await insertUsers(users.hashes())
})

Given(/I am not logged in/, async function () {
  
})

Given(/I am logged in as (.*)/, async function (name) {
  
})

When(/I visit the (.*) page/, async function (pageName) {
  this.scenario.page = getPage(pageName)
  await this.scenario.page.goto()
})

When(/I authenticate via the IDP/, async function () {

})

Then(/I should see a link to log in/, async function () {
  const link = await this.scenario.page.loginLink
  expect(link.visible()).to.be.true
})

Then(/I should see the (.*) page/, async function (pageName) {
  const page = getPage(pageName)
  browser.wait(until.urlIs(page.url))
})

Then(/The greeting should say (.*)/, async function (expected) {
 const greeting = await this.scenario.page.greeting()
 expect(greeting).to.equal(expected)
})

Then(/There should be (no|an) admin menu/, async function (noan) {
  const expected = noan === 'an'
  const menu = await this.scenario.page.adminMenu()
  expect(menu.visible()).to.be(expected)
})
