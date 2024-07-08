const {createTrail, fetchWalks, removeWalk} = require('../models/walks.model')

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
    catch(err) {
        next(err)
    }
}

async function deleteWalk(req, res, next) {
    try {
        const id = parseInt(req.params.id)
        await removeWalk(id)
        res.status(204).send()
    }
    catch(err) {
        next(err)
    }
}


module.exports = {getWalks, postTrail, deleteWalk}