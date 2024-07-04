const usersRouter = require('express').Router()
const {getUser} = require('../controllers/users.controller')

usersRouter.route('/')
    .get(getUser)

module.exports = usersRouter