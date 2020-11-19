const express = require('express');
const router  = express.Router();

const {
  landingPage,
  search,
  feedView
} = require('../controllers/index')

const {isNotAuth, isAuth} = require('../middlewares/index')

/* GET home page */
// router.get('/', (req, res, next) => {
//   res.render('index');
// });
router.get('/', landingPage)
router.get('/feed', feedView)


router.post('/search', search)



// router.post('/search')

module.exports = router;
