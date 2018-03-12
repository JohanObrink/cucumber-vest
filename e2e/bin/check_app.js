#!/usr/bin/env node
const fetch = require('node-fetch')
const nconf = require('nconf').argv().env({separator: '_', lowerCase: true})
const url = `${nconf.get('app:host')}/health`

const wait = (delay) => new Promise(resolve => { setTimeout(resolve, delay) })

const timeout = (delay = 90000) => wait(delay)
  .then(() => {
    process.stderr.write(`Connection attempt timed out after ${delay} ms\n`)
    return Promise.reject()
  })

const checkApp = (delay = 1000) => {
  process.stdout.write(`Attempting to connect to ${url}\n`)
  return fetch(url)
    .then(res => res.status >= 200 && res.status < 300 ? res.json() : Promise.reject(res))
    .catch(() => {
      process.stdout.write(`Connection failed. Retrying in ${delay} ms\n`)
      return wait(delay).then(() => checkApp(delay + 2000))
    })
}

const start = () => Promise.race([checkApp(), timeout()])
  .then(() => 0)
  .catch(() => 1)
  .then(code => process.exit(code))

start()
