var Dispatcher = require('../dispatcher/dispatcher.js'),
    _ = require('lodash'),
    cities = require('../data/cities.js'),
    bean = require('bean');

var PlayerDeckStore = {
    playerDeck: [],
    playerDiscardPile: [],

    _populatePlayerDeck: function() {
        var cards = _.keys(cities),
            deck = [],
            length = cards.length,
            randomIdx,
            EPIDEMIC_COUNT = 4; // hardcoded to easy, for now

        for (var i = 0; i < EPIDEMIC_COUNT; i++) {
            cards.push('Epidemic');
        }

        for (var i = 0; i < length; i++) {
            randomIdx = Math.floor((Math.random() * cards.length - 1) + 1);
            deck.push(cards.splice(randomIdx, 1)[0]);
        }

        return deck;
    },

    setPlayerDeck: function() {
        this.playerDeck = this._populatePlayerDeck();
    },

    draw: function() {
        var card = this.playerDeck.shift();
        this.playerDiscardPile.push(card);
    },

    register: function() {
        var _this = this;

        // Register to handle all updates
        Dispatcher.register(function(payload) {
            var action = payload.action;

            switch (action.actionType) {
                case InfectionConstants.DRAW:
                    _this.draw();
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

PlayerDeckStore.setPlayerDeck();
PlayerDeckStore.register();

module.exports = PlayerDeckStore;
