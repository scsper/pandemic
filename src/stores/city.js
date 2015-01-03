var Dispatcher = require('../dispatcher/dispatcher.js'),
    InfectionConstants = require('../constants/infection.js'),
    cities = require('../data/cities.js'),
    _ = require('lodash'),
    bean = require('bean');

var CityStore = {
    cities: cities,

    initializeCities: function() {
        _.forEach(_.values(this.cities), function(city) {
            city.diseaseCount = 0;
            city.hasResearchCenter = false;
        });

        cities['Atlanta'].hasResearchCenter = true;
    },

    getCities: function() {
        return this.cities;
    },

    getLocation: function(city) {
        return this.cities[city].location;
    },

    register: function() {
        var _this = this;

        // Register to handle all updates
        Dispatcher.register(function(payload) {
            var action = payload.action;

            switch (action.actionType) {
                case InfectionConstants.DRAW:
                    var city = action.city;

                    // multiple disease cubes may be added when setting the initial state or handling an epidemic
                    _this.cities[city].diseaseCount += action.diseaseCount || 1;
                    break;

                default:
                    return true;
            }

            // This often goes in each case that should trigger a UI change. This store
            // needs to trigger a UI change after every view action, so we can make the
            // code less repetitive by putting it here.  We need the default case,
            // however, to make sure this only gets called after one of the cases above.
            bean.fire(_this, 'changed');

            return true; // No errors.  Needed by promise in Dispatcher.
        });
    }
};

CityStore.initializeCities();
CityStore.register();

module.exports = CityStore;
