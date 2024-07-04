const express = require('express')
const apiRouter = require('express').Router()

const walksRouter = require('./walks-router')
const locationPointsRouter = require('./locationpoints-router')
const usersRouter = require('./users-router')

apiRouter.use(express.json())

// Endpoints. 
apiRouter.use('/walks', walksRouter)
apiRouter.use('/walklocationpoints/', locationPointsRouter)
apiRouter.use('/user/', usersRouter)

module.exports = apiRouter;