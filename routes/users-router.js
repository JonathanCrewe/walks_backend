const usersRouter = require('express').Router()
const {getUser} = require('../controllers/users.controller')

usersRouter.route('/')
    .get(getUser)

    usersRouter.route('/login')
    .post(signIn)

module.exports = usersRouter