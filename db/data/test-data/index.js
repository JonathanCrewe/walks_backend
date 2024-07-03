exports.userData = require('./users.js');
exports.walkData = require('./walks.js');

const walk1LocationsData = require('./walk1-location-points.js');
const walk2LocationsData = require('./walk2-location-points.js');
exports.walkLocationsData = [walk1LocationsData, walk2LocationsData]