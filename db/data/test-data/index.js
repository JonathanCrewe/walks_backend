exports.userData = require('./users.js');
exports.walkData = require('./walks.js');

const walk1LocationsData = require('./walk1-location-points.js');
const walk2LocationsData = require('./walk2-location-points.js');
const walk3LocationsData = require('./walk3-location-points.js');
const walk4LocationsData = require('./walk4-location-points.js');
const walk5LocationsData = require('./walk5-location-points.js');
const walk6LocationsData = require('./walk6.location-points.js');

exports.walkLocationsData = [   walk1LocationsData, walk2LocationsData, 
                                walk3LocationsData, walk4LocationsData, 
                                walk5LocationsData, walk6LocationsData ]