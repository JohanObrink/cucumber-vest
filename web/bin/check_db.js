#!/usr/bin/env node
const {Client} = require('pg')
const config = require('../config').get('postgres')

function checkDb () {
  return new Promise((resolve, reject) => {
    connect(resolve, reject, 1000)
  })
}

function connect (resolve, reject, timeout) {
  process.stdout.write(`Trying to connect to ${JSON.stringify(config, null, 2)}\n`)
  const client = new Client(config)
  client.once('error', err => {
    process.stderr.write(`${err}\n${err.stack}\n\n`)
  })
  client.connect(err => {
    if (err) {
      process.stderr.write(`Connection failed with message ${err.message}. Retrying in ${timeout} ms...\n`)
      setTimeout(() => connect(resolve, reject, timeout + 2000), timeout)
    } else {
      client.end(err => {
        if (err) {
          process.stderr(`${err}\n${err.stack}\n\n`)
          return reject(err)
        }
        resolve()
      })
    }
  })
}

function timeout (ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      process.stderr.write('Timeout\n')
      reject('Timeout')
    }, ms)
  })
}

function run () {
  return Promise
    .race([checkDb(), timeout(90000)])
    .then(() => 0)
    .catch(() => 1)
    .then(code => process.exit(code))
}

run()
