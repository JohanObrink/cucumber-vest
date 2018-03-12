const { Strategy } = require('passport-saml')
const { readFileSync } = require('fs')
const { resolve } = require('path')
const config = require('./config')

function readFileIfNotCertificateString (string) {
  if (`${string}`.startsWith('-----BEGIN ')) {
    return string.replace(/\\n/g, '\n')
  }

  return readFileSync(resolve(process.cwd(), string), { encoding: 'utf8' })
}

const cert = readFileIfNotCertificateString('./certs/fake-idp.pem')
const privateCert = readFileIfNotCertificateString('./certs/fake-sso.pem')
const decryptionPvk = readFileIfNotCertificateString('./certs/fake-sso.key')

const entryPoint = 'http://localhost:4000/sso'

const authUrl = `${config.get('host')}:${config.get('port')}/auth`

const options = {
  cert,
  decryptionPvk,
  entryPoint,
  privateCert: decryptionPvk,
  callbackUrl: `${authUrl}/callback`,
  issuer: `${authUrl}/metadata.xml`,
  disableRequestedAuthnContext: true,
  identifierFormat: 'urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified'
}

function callback (profile, next) {
  next(null, profile)
}

const strategy = new Strategy(options, callback)

function metadata (req, res) {
  const xml = strategy.generateServiceProviderMetadata(privateCert)
  res.writeHead(200, {
    'Content-Length': Buffer.byteLength(xml),
    'Content-Type': 'application/xml'
  })
  res.write(xml)
  res.end()
}

module.exports = Object.assign(strategy, {
  authUrl,
  metadata,
  metadataUrl: options.issuer,
  callbackUrl: options.callbackUrl
})
