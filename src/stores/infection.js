var Dispatcher = require('../dispatcher/dispatcher.js'),
    InfectionConstants = require('../constants/infection.js'),
    _ = require('lodash'),
    cities = require('../data/cities.js'),
    bean = require('bean');

var InfectionStore = {
    infectionDeck: [],
    infectionDiscardPile: [],
    infectionRate: 0,

    _populateInfectionDeck: function() {
        var cards = _.keys(cities),
            deck = [],
            length = cards.length,
            randomIdx;

        for (var i = 0; i < length; i++) {
            randomIdx = Math.floor((Math.random() * cards.length - 1) + 1);
            deck.push(cards.splice(randomIdx, 1)[0]);
        }

        return deck;
    },

    getTopCard: function() {
        return this.infectionDeck[0];
    },

    setInfectionDeck: function() {
        this.infectionDeck = this._populateInfectionDeck();
    },

    register: function() {
        var _this = this;

        // Register to handle all updates
        Dispatcher.register(function(payload) {
            var action = payload.action;

            switch (action.actionType) {
                case InfectionConstants.DRAW:
                    var card = _this.infectionDeck.shift();
                    _this.infectionDiscardPile.push(card);
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

InfectionStore.setInfectionDeck();
InfectionStore.register();

module.exports = InfectionStore;
