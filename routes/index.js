const express = require('express');
const router  = express.Router();

const {
  landingPage,
  search
} = require('../controllers/index')

/* GET home page */
// router.get('/', (req, res, next) => {
//   res.render('index');
// });
router.get('/', landingPage)

router.post('/search', search)

// router.post('/search')

module.exports = router;
