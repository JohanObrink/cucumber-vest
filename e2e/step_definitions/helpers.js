const nconf = require('nconf').argv().env({separator: '_', lowerCase: true})
const pages = require('require-dir')('../pages')
const pgp = require('pg-promise')()
const db = pgp(nconf.get('database:url'))

function getPage (pageName) {
  const host = nconf.get('app:host')
  const page = pages[pageName]

  if (!page) {
    throw new Error(`Page ${pageName} unknown`)
  }
  
  return page
}

async function clearDb () {
  return
  await db.tx(t => t.batch([
    t.none('TRUNCATE TABLE users')
  ]))
}

function insertUsers (context, users) {
  context.idp.options.users = users.map(u => Object.assign({
    attributes: {
      id: {
        format: 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
        value: u.id,
        type: 'xs:string'
      },
      role: {
        format: 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
        value: u.role,
        type: 'xs:string'
      },
      name: {
        format: 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
        value: u.name,
        type: 'xs:string'
      }
    }
  }, u))
}

module.exports = {getPage, clearDb, insertUsers}
