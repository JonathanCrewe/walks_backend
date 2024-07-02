const walksRouter = require('express').Router()
const postTrail = require('../controllers/walks.controller')

walksRouter.route('/').post(postTrail)

module.exports = walksRouter