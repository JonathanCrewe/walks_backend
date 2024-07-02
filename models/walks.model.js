const db = require("../db/connection")
const format = require('pg-format');

async function createTrail(trailObj) {
    // Insert the WALK record. 
    const walkObj = trailObj.walk
    let insertWalkStr = `INSERT INTO walks (
                                    creator_id,
                                    title,
                                    description, 
                                    distance,
                                    ascent,
                                    rating, 
                                    difficulty,
                                    start_latitude,
                                    start_longitude,
                                    start_altitude
                                ) 
                                VALUES ( 
                                    $1, 
                                    $2, 
                                    $3,
                                    $4, 
                                    $5, 
                                    $6,
                                    $7, 
                                    $8, 
                                    $9,
                                    $10 ) RETURNING *;`

    const insertWalkResult = await db.query(insertWalkStr, [walkObj.creator_id,
                                                            walkObj.title,
                                                            walkObj.description, 
                                                            walkObj.distance,
                                                            walkObj.ascent,
                                                            walkObj.rating, 
                                                            walkObj.difficulty,
                                                            walkObj.start_latitude,
                                                            walkObj.start_longitude,
                                                            walkObj.start_altitude])
    const walkId = insertWalkResult.rows[0].id

    // Insert WALK_LOCATION_POINTS records. 
    const locationsObj = trailObj.locations
    const insertWalkLocationsStr = format(`INSERT INTO walk_location_points (
                                                walk_id, 
                                                latitude, 
                                                longitude, 
                                                altitude) 
                                            VALUES %L;`, 
                                            locationsObj.map( ({latitude, longitude, altitude}) => [walkId, 
                                                                                                    latitude, 
                                                                                                    longitude,
                                                                                                    altitude
                                                                                                        ])
                                        )

    return await db.query(insertWalkLocationsStr)
    // ToDo - return the created objects? Just the Walk object?
}

module.exports = createTrail