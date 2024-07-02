const app = require('../app')
const testData = require('../db/data/test-data/index')
const db = require('../db/connection')
const request = require('supertest')
const seed = require('../db/seeds/seed')

require("pg").defaults.parseInt8 = true;


beforeEach( () => {
    return seed(testData)
})

afterAll( () => {
    return db.end()
})


describe("POST/api/walks", () => {
    test("201 - responds with 201 when trail created", async () => {
        const requestBody = {
            walk: {
                creator_id: 1,
                title: 'Bronte country 2',
                description: 'Haworth to Withins Heights with only start, middle and end locations.',
                distance_km: 11.72,
                ascent: 345.75,
                rating: null, 
                difficulty:  null,
                start_latitude: 53.8289460,
                start_longitude: -1.9569740,
                start_altitude: 0 
            },
            locations: [    {   latitude: 53.8289460, 
                                longitude: -1.9569740,
                                altitude: 0 
                            }, 
                            {   latitude: 53.8168600, 
                                longitude: -2.0214000,
                                altitude: 0
                            },
                            {   latitude: 53.8288640, 
                                longitude: -1.9571290,
                                altitude: 0
                            }
                        ]
        }

        const response  = await request(app).post("/api/walks").send(requestBody).expect(201)

        // ToDo - expect body to be new walk object?
    })
})