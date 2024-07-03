const walksRouter = require('express').Router()
const {getWalks, postTrail} = require('../controllers/walks.controller')

walksRouter.route('/')
    .get(getWalks)
    .post(postTrail)

walksRouter.route('/:creator_id')
    .get(getWalks)

module.exports = walksRouter