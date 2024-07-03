const express = require('express')
const apiRouter = require('express').Router()

const walksRouter = require('./walks-router')
const locationPointsRouter = require('./locationpoints-router')

apiRouter.use(express.json())

// Endpoints. 
apiRouter.use('/walks', walksRouter)
apiRouter.use('/walklocationpoints/', locationPointsRouter)

module.exports = apiRouter;