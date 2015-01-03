var Dispatcher = require('../dispatcher/dispatcher.js'),
    Roles = require('../constants/roles.js'),
    _ = require('lodash'),
    MAX_PLAYERS = 4,
    getRandomInteger = require('../utils').getRandomInteger,
    bean = require('bean');

var PlayersStore = {
    players: [{
        id: '',
        location: '',
        cards: [],
        role: ''
    }],

    _assignRoles: function() {
        var roles = _.keys(Roles),
            count = 0;

        while (count < MAX_PLAYERS) {
            this.players.role = roles.splice(getRandomInteger(roles.length), 1)[0];
            count++;
        }
    },

    initialize: function() {
        this._assignRoles();
    },

    register: function() {
        var _this = this;

        // Register to handle all updates
        Dispatcher.register(function(payload) {
            var action = payload.action;

            switch (action.actionType) {

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

PlayerStore.initialize();
PlayerStore.register();

module.exports = PlayerStore;
