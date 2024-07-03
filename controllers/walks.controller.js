const {createTrail, fetchWalks} = require('../models/walks.model')

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

async function getWalks(req, res, next) {
    try {
        const creatorId = req.params.creator_id
        const walkArray = await fetchWalks(creatorId)
        res.status(200).send({walks: walkArray})
    }
    catch {
        next(err)
    }
}


module.exports = {getWalks, postTrail}