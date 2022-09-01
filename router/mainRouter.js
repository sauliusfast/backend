const express = require('express')
const router = express.Router()
const { 
    upload,
    autoLogin,
    filter,
    register,
    logout,
    users,
    login,
    like,
    history,
} = require('../controlers/mainControler')
 const { registerValidate, uploadValidate } = require('../middleware/mainMiddleware')

router.get('/autoLogin', autoLogin)
router.post('/login', login)
router.post('/register', registerValidate, register)
router.post('/upload', uploadValidate, upload)
router.post('/users', users)
router.post('/filter', filter)
router.post('/history', history)
router.post('/like', like)
router.get('/logout', logout)
module.exports = router