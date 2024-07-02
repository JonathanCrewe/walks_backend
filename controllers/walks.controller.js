const createTrail = require('../models/walks.model')

async function postTrail(req, res, next) {
    try {
        const newTrail = req.body
        await createTrail(newTrail)
        res.status(201).send()
    }
    catch(err) {
        next(err)
    }
}

module.exports = postTrail