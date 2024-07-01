const format = require('pg-format');
const db = require('../connection');

// ToDo add params back in when creating seed data
//async function seed ({ topicData, userData, articleData, commentData }) {
async function seed () {
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
                        distance NUMERIC,
                        ascent NUMERIC,
                        rating NUMERIC, 
                        difficulty NUMERIC,
                        start_latitude NUMERIC(10,7) NOT NULL,
                        start_longitude NUMERIC(10,7) NOT NULL,
                        start_altitude NUMERIC(6,2) NOT NULL );`)
    return await db.query(`CREATE TABLE walk_location_points (
                            id SERIAL PRIMARY KEY,
                            walk_id INT REFERENCES walks(id), 
                            latitude NUMERIC(10,7) NOT NULL, 
                            longitude NUMERIC(10,7) NOT NULL, 
                            altitude NUMERIC(6,2) NOT NULL, 
                            timestamp TIMESTAMP NOT NULL );`)
}

module.exports = seed;