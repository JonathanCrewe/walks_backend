const format = require('pg-format');
const db = require('../connection');

// ToDo add params back in when creating seed data
//async function seed ({ topicData, userData, articleData, commentData }) {
async function seed ({userData, walkData, walkLocationsData}) {
    // Drop any existing tables. 
    await db.query(`DROP TABLE IF EXISTS walk_location_points;`);
    await db.query(`DROP TABLE IF EXISTS walks;`);
    await db.query(`DROP TABLE IF EXISTS users;`);

    // Create tables. 
    await db.query(`CREATE TABLE users (
                        id SERIAL PRIMARY KEY, 
                        username VARCHAR NOT NULL,
                        password VARCHAR NOT NULL );`)
    await db.query(`CREATE TABLE walks (
                        id SERIAL PRIMARY KEY,
                        creator_id INT REFERENCES users(id) NOT NULL,
                        title VARCHAR NOT NULL,
                        description VARCHAR, 
                        distance NUMERIC(4,2),
                        ascent NUMERIC,
                        rating NUMERIC, 
                        difficulty NUMERIC,
                        start_latitude NUMERIC(10,7) NOT NULL,  
                        start_longitude NUMERIC(10,7) NOT NULL,
                        start_altitude NUMERIC(6,2) NOT NULL );`)
    await db.query(`CREATE TABLE walk_location_points (
                        id SERIAL PRIMARY KEY,
                        walk_id INT REFERENCES walks(id), 
                        latitude NUMERIC(10,7) NOT NULL, 
                        longitude NUMERIC(10,7) NOT NULL, 
                        altitude NUMERIC(6,2) NOT NULL, 
                        location_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP );`)


    // Create data.

    // Users.
    const insertUserStr = format(`INSERT INTO users (username, password) VALUES %L RETURNING *;`, 
                                    userData.map( ({username, password}) => [username, password])
    )

    const insertUserResult = await db.query(insertUserStr)
    const userId = insertUserResult.rows[0].id

    // Walks. 
    const insertWalkStr = format(`INSERT INTO walks (
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
                                VALUES %L RETURNING *;`, 
                                    walkData.map( ({title,
                                                    description, 
                                                    distance,
                                                    ascent,
                                                    rating, 
                                                    difficulty,
                                                    start_latitude,
                                                    start_longitude,
                                                    start_altitude}) => [   userId,
                                                                            title,
                                                                            description, 
                                                                            distance,
                                                                            ascent,
                                                                            rating, 
                                                                            difficulty,
                                                                            start_latitude,
                                                                            start_longitude,
                                                                            start_altitude])
    )
    
    

    const insertWalkResult = await db.query(insertWalkStr)
    const walkId = insertWalkResult.rows[0].id

    // Walk Location Points.
    const insertWalkLocationsStr = format(`INSERT INTO walk_location_points (
                                                walk_id, 
                                                latitude, 
                                                longitude, 
                                                altitude) 
                                            VALUES %L;`, 
                                            walkLocationsData.map( ({latitude, longitude, altitude}) => [   walkId, 
                                                                                                            latitude, 
                                                                                                            longitude,
                                                                                                            altitude
                                                                                                        ])
                                        )

    return await db.query(insertWalkLocationsStr)
}

module.exports = seed;