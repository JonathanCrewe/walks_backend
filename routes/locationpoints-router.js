const locationPointsRouter = require('express').Router()
const {getLocationPoints} = require('../controllers/locationpoints.controller')

locationPointsRouter.route('/:walk_id').get(getLocationPoints)

module.exports = locationPointsRouter