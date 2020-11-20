const Router=require('express')
const uploadPicture=require('../configs/cloudinary')
const {createEvent,
  viewCreateEvent,
  updateEvent, 
  viewEditEvent, 
  viewMyEvents,
  viewEventDetails,
  deleteEvent,
  eventMenuView,
  createMenuView,
  createMenuProcess,
  deleteMenu,
  editMenuView,
  editMenuProcess,
  publicViewMyEvents,
  publicViewEventDetails,
  publicEventMenuView,
  viewWriteEmail
}=require('../controllers/events')
const { 
  isAuth, 
  isNotAuth,
  checkRole
} = require('../middlewares/index')
const router=Router()

//Create Event
router.get('/create', isAuth, viewCreateEvent)
router.post('/create', isAuth,  uploadPicture.single('image'), createEvent)

//Edit & Update Event
router.get('/edit/:id', isAuth, viewEditEvent)
router.post('/edit/:id', isAuth,  uploadPicture.single('image'), updateEvent)

//List All Events
router.get('/events-user', isAuth, viewMyEvents)

//Event details
router.get('/detail/:id', isAuth, viewEventDetails)

//Delete event
router.get('/delete/:id', isAuth,  deleteEvent)

//Event Menu
router.get('/:id/menu/', isAuth,  eventMenuView)
router.get('/:id/menu/create', isAuth,  createMenuView)
router.post('/:id/menu/create', isAuth, createMenuProcess)
router.get('/:id/menu/delete', isAuth, deleteMenu)
router.get('/:id/menu/edit', isAuth, editMenuView)
router.post('/:id/menu/edit', isAuth, editMenuProcess)

//Public Events
router.get('/:id/events-user', isAuth, publicViewMyEvents)
router.get('/:id/events-user/detail', publicViewEventDetails )
router.get('/:id/publicmenu', isAuth, publicEventMenuView )

module.exports = router;
