const nconf = require('nconf')

module.exports = nconf.env({lowerCase: true, separator: '_'})
