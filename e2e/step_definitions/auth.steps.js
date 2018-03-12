const {Given, When, Then} = require('cucumber')
const {client: browser} = require('nightwatch-cucumber')
const {expect} = require('chai')
const {insertUsers, getPage} = require('./helpers')

const wait = (delay) => new Promise(resolve => setTimeout(resolve, delay))

Given(/The following users exist in the IDP/, async function (users) {
  insertUsers(this, users.hashes())
})

Given(/I am not logged in/, async function () {
  this.idp.currentUserId = null
})

Given(/I am logged in as "(.*)"/, async function (id) {
  this.idp.currentUserId = id
})

When(/I visit the (.*) page/, async function (pageName) {
  this.page = getPage(pageName)
  await this.page.goto()
})

When(/I authenticate via the IDP/, async function () {
  await getPage('auth').goto()
})

When(/I log out/, async function () {
  await getPage('logout').goto()
})

Then(/I should see a link to log in/, async function () {
  await browser.assert.visible(this.page.loginLink)
})

Then(/I should see the (.*) page/, async function (pageName) {
  const page = getPage(pageName)
  await browser.assert.urlEquals(page.url)
  this.page = page
})

Then(/The greeting should say "(.*)"/, async function (greeting) {
  await browser.assert.containsText(this.page.greeting, greeting)
})

Then(/There should be (no|an) admin menu/, async function (noan) {
  const present = noan === 'an'
  if (present) {
    await browser.assert.elementPresent(this.page.adminMenu)
  } else {
    await browser.assert.elementNotPresent(this.page.adminMenu)
  }
})
