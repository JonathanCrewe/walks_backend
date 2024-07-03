const walksRouter = require('express').Router()
const {getWalks, postTrail} = require('../controllers/walks.controller')

walksRouter.route('/')
    .get(getWalks)
    .post(postTrail)

module.exports = walksRouter