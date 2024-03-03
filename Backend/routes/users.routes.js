const Router = require('express')
const { model } = require('mongoose')
const router = new Router()
const multer = require('multer');
const path = require('path');

const usersController = require('../controller/users.controller');
const { profile } = require('console');
//const usersController1 = require('../controller/controller1');



router.post('/user', usersController.createUser)
router.post('/function', usersController.createFunction)

router.get('/user/a', usersController.getUsersA)
router.get('/user/b', usersController.getUsersB)
router.get('/user/c', usersController.getUsersC)
router.get('/user/d', usersController.getUsersD)
router.get('/user/e', usersController.getUsersE)
router.get('/user/f', usersController.getUsersF)
router.get('/user/g', usersController.getUsersG)
router.get('/user/h', usersController.getUsersH)

router.get('/user/info', usersController.info)
router.get('/user/user', usersController.getOneUser)
router.get('/user/login', usersController.login)
router.delete('/user/:id', usersController.deleteUser)
router.post('/user/add', usersController.createFunction1)

//-----------------------------------------------

//router.post('/user/add', usersController1.createFunction1)
//router.get('/user/info', usersController1.info)





module.exports = router