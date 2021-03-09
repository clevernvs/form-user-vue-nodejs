var express = require("express")
var app = express()
var router = express.Router()
var HomeController = require("../controllers/HomeController")
var UserController = require("../controllers/UserController")
var AdminAuth = require("../middlewares/AdminAuth")

router.get('/', HomeController.index)
router.post('/validate', AdminAuth, HomeController.validate)

router.get('/user', AdminAuth, UserController.index)
router.post('/user', UserController.create)
router.get('/user/:id', AdminAuth, UserController.findUser)
router.put('/user', AdminAuth, UserController.edit)
router.delete('/user/:id', AdminAuth, UserController.remove)
router.post('/recoverPassword', UserController.recoverPassword)
router.post('/changePassword', UserController.changePassword)
router.post('/login', UserController.login)

module.exports = router