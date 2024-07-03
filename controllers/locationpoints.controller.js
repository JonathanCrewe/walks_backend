const {fetchLocationPoints} = require('../models/locationpoints.model')

async function getLocationPoints(req, res, next) {
    try {
        const walkId = parseInt(req.params.walk_id)

        const locationPointsArray = await fetchLocationPoints(walkId)

        res.status(200).send({locationPoints: locationPointsArray})
    }
    catch {
        next(err)
    }
}


module.exports = {getLocationPoints}