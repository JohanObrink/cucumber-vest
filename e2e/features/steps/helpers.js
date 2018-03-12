const nconf = require('nconf').argv().env({separator: '_', lowerCase: true})
const {kdfSync, params} = require('scrypt')
const pgp = require('pg-promise')()
const db = pgp(nconf.get('database:url'))

function getUrl (pageName) {
  const host = nconf.get('app:host')
  const pages = {
    'login page': '/users/login',
    'profile page': '/users'
  }
  const page = pages[pageName]
  if (!page) {
    throw new Error(`Page ${pageName} unknown`)
  }
  return `${host}${page}`
}

async function clearDb () {
  await db.tx(t => t.batch([
    t.none('TRUNCATE TABLE users')
  ]))
}

async function insertUsers (users) {
  const p = await params(0.1)
  await db.tx(t => {
    const inserts = users
      .map(user => {
        user = Object.assign({}, user)
        const hash = kdfSync(user.password, p)
        user.password = hash.toString('base64')
        const sql = pgp.helpers.insert(user, null, 'users')
        return t.any(sql)
      })
    return t.batch(inserts)
  })
}

module.exports = {getUrl, clearDb, insertUsers}
