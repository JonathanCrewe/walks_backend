const usersRouter = require('express').Router()
const {getUser , signIn } = require('../controllers/users.controller')

usersRouter.route('/')
    .get(getUser)

    usersRouter.route('/login')
    .post(signIn)

module.exports = usersRouter