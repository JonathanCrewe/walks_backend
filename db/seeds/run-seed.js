// ToDo - add this back in for data inserts
//const devData = require('../data/development-data/index.js');
const seed = require('./seed.js');
const db = require('../connection.js');

async function runSeed() {
    // ToDo - add this back in for data inserts
    //await seed(devData);
    await seed();
    return await db.end();
};

runSeed();
