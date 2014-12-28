var _ = require('lodash'),
    GameConstants = require('../constants/game.js'),
    Dispatcher = require('../dispatcher/dispatcher.js');

module.exports = {
    start: function() {
        Dispatcher.handleAction({
            actionType: GameConstants.START
        });
    }
};
