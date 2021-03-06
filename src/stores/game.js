var Dispatcher = require('../dispatcher/dispatcher.js'),
    GameConstants = require('../constants/game.js'),
    _ = require('lodash'),
    bean = require('bean');

var GameStore = {
    turn: '', // player's id
    turnState: GameConstants.INITIAL,
    actionsCompleted: 0,

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

GameStore.register();
module.exports = GameStore;
