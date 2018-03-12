const {create} = require('fake-sso-idp')
const {BeforeAll, Before, After, AfterAll} = require('cucumber')
const {clearDb} = require('./helpers')

let idp

const options = {
  serviceProvider: {
    destination: process.env.SP_DESTINATION || 'http://localhost:3000/auth/saml/callback',
    metadata: process.env.SP_METADATA || 'http://localhost:3000/auth/saml/metadata.xml'
  },
  middlewares: [
    (req, res, next) => {
      if (idp.currentUserId) {
        const currentUser = idp.options.users.filter(u => u.id === idp.currentUserId)[0]
        req.session.user = currentUser
      }
      next()
    }
  ]
}


BeforeAll(() => {
  idp = create(options).listen(4000)
})

AfterAll(() => {
  // You're my Wonderwall!
  idp.server.close()
})

Before(async function() {
  await clearDb()
  this.idp = idp
})

After(async function () {
  await clearDb()
})