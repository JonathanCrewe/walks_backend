const walkRouter = require('express').Router()
const {deleteWalk} = require('../controllers/walks.controller')

walkRouter.route('/:id')
    .delete(deleteWalk)

module.exports = walkRouter