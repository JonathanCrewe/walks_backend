const createTrail = require('../models/walks.model')

async function postTrail(req, res, next) {
    try {
        const newTrail = req.body
        const postTrailResponse = await createTrail(newTrail)
        res.status(201).send(postTrailResponse)
    }
    catch(err) {
        next(err)
    }
}

module.exports = postTrail