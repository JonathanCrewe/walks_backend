const db = require("../db/connection")
const format = require('pg-format');


// Create Trail. 
async function createTrail(trailObj) {
    const returnObj = {}

    // Insert the WALK record. 
    const walkObj = trailObj.walk
    let insertWalkStr = `INSERT INTO walks (
                                    creator_id,
                                    title,
                                    description, 
                                    distance_km,
                                    ascent,
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
                                    $9 ) RETURNING *;`

    const insertWalkResult = await db.query(insertWalkStr, [walkObj.creator_id,
                                                            walkObj.title,
                                                            walkObj.description, 
                                                            walkObj.distance_km,
                                                            walkObj.ascent,
                                                            walkObj.difficulty,
                                                            walkObj.start_latitude,
                                                            walkObj.start_longitude,
                                                            walkObj.start_altitude ])
    
    returnObj.walk = insertWalkResult.rows[0]
    const walkId = returnObj.walk.id

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

    await db.query(insertWalkLocationsStr)

    return returnObj
}

// Fetch Walks. 
async function fetchWalks(creatorId, difficultyRequired, minDistance, maxDistance) {
    // Code body. 
    let walkQueryStr = `SELECT  wlk.*, 
                                usr.username
                        FROM    walks wlk
                        JOIN users usr ON usr.id = wlk.creator_id`

    const queryParamArray = []

    // Creator. 
    if (creatorId) {
        queryParamArray.push(creatorId)
        walkQueryStr += ` WHERE creator_id = $1`
    }

    // Difficulty. 
    if (difficultyRequired) {
        if (queryParamArray.length) {
            walkQueryStr += ` AND`
        } else {
            walkQueryStr += ` WHERE`
        }

        queryParamArray.push(difficultyRequired)
        walkQueryStr += ` difficulty = $${queryParamArray.length}`
    }

    // MinDistance
    if (minDistance) {
        if (queryParamArray.length) {
            walkQueryStr += ` AND`
        } else {
            walkQueryStr += ` WHERE`
        }

        queryParamArray.push(minDistance)
        walkQueryStr += ` distance_km >= $${queryParamArray.length}`
    }

    // MaxDistance
    if (maxDistance) {
        if (queryParamArray.length) {
            walkQueryStr += ` AND`
        } else {
            walkQueryStr += ` WHERE`
        }

        queryParamArray.push(maxDistance)
        walkQueryStr += ` distance_km <= $${queryParamArray.length}`
    }

    walkQueryStr = walkQueryStr + ';'

    console.log(walkQueryStr)

    const fetchWalksResult = await db.query(walkQueryStr, queryParamArray)

    return fetchWalksResult.rows
}

// Remove Walk. 
async function removeWalk(id) {
    if (!Number.isInteger(id)) {
        return Promise.reject({ status: 400, msg: "Bad Request" })
    }

    let deleteStr = 'DELETE FROM walks WHERE id = $1;'
    const deleteResult = await db.query(deleteStr, [id])

    if (deleteResult.rowCount === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
    }
}


module.exports = {createTrail, fetchWalks, removeWalk}