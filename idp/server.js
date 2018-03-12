const {create} = require('fake-sso-idp')
const app = create({
  serviceProvider: {
    destination: process.env.SP_DESTINATION || 'http://localhost:3000/auth/saml/callback',
    metadata: process.env.SP_METADATA || 'http://localhost:3000/auth/saml/metadata.xml'
  },
  host: process.env.HOST,
  users: [
    {
      id: 'johanobrink',
      name: 'Johan Öbrink [User without role] (userid: johanobrink)',
      username: 'johanobrink',
      password: 'pwd',
      attributes: {
        id: {
          format: 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          value: '12345',
          type: 'xs:string'
        },
        role: {
          format: 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          value: 'user',
          type: 'xs:string'
        },
        name: {
          format: 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          value: 'Johan Öbrink',
          type: 'xs:string'
        }
      }
    },
    {
      id: 'hal9000',
      name: 'HAL 9000 [Super admin] (userid: hal9000)',
      username: 'hal9000',
      password: 'pwd',
      attributes: {
        nameID: {
          id: 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          value: '67890',
          type: 'xs:string'
        },
        role: {
          format: 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          value: 'superadmin',
          type: 'xs:string'
        },
        name: {
          format: 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          value: 'HAL 9000',
          type: 'xs:string'
        }
      }
    }
  ]
})
app.listen(process.env.PORT || 4000)
