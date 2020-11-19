exports.isAuth = (req,res,next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.render("notLogged")
  }
}

exports.isNotAuth = (req,res,next) => {
  if (!req.isAuthenticated()) {
    next()
  } else {
    res.redirect("/")
  }
}

exports.checkRole = role => (req, res, next) => {
  if (role.includes(req.user.role)) {
      return next()
  } else {
      res.redirect('/')
  }
}

exports.isProfileComplete = (req,res,next) => {

}