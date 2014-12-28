var _ = require('lodash'),
    InfectionConstants = require('../constants/infection.js'),
    Dispatcher = require('../dispatcher/dispatcher.js');

module.exports = {
    draw: function(city, diseaseCount) {
        Dispatcher.handleAction({
            actionType: InfectionConstants.DRAW,
            city: city,
            diseaseCount: diseaseCount
        });
    }
};
