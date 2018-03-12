const {Router} = require('express')
const router = Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
})

/* GET welcome page. */
router.get('/welcome', (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/')
  }
  res.render('welcome', { title: 'Logged in', user: req.session.user })
})

/* GET logout page. */
router.get('/logout', (req, res, next) => {
  req.session.user = null
  return res.redirect('/')
})

module.exports = router
