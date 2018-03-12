const express = require('express')
const {join} = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const routes = require('./routes')
const passport = require('passport')
const samlStrategy = require('./samlStrategy')

passport.use(samlStrategy)

const app = express()

// view engine setup
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'pug')

// uncomment after placing your favicon in /public
//app.use(favicon(join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(express.static(join(__dirname, 'public')))

app.use((req, res, next) => {
  if (req.session && req.session.user) {
    res.locals.user = req.session.user
  }
  next()
})

app.use('/', routes)

// saml sso auth
app.get('/auth/metadata.xml', samlStrategy.metadata)
app.get('/auth', passport.authenticate('saml', { session: false }))
app.get('/auth/callback', passport.authenticate('saml', { session: false }),
  (req, res) => {
    req.session.user = req.user
    res.redirect(303, '/welcome')
  })
app.post('/auth/callback', passport.authenticate('saml', { session: false }),
  (req, res) => {
    req.session.user = req.user
    res.redirect(303, '/welcome')
  })

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
