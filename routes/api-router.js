const express = require('express')
const apiRouter = require('express').Router()

const walksRouter = require('./walks-router')

apiRouter.use(express.json())

// Endpoints. 
apiRouter.use('/walks', walksRouter)

module.exports = apiRouter;