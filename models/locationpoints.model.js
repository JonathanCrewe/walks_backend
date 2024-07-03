const db = require("../db/connection")

async function fetchLocationPoints(walkId) {
    const locationQueryStr =   `SELECT *
                                FROM walk_location_points 
                                WHERE walk_id = $1
                                ORDER BY location_timestamp, id;`

    const fetchLocationsResult = await db.query(locationQueryStr, [walkId])

    return fetchLocationsResult.rows
}

module.exports = {fetchLocationPoints}