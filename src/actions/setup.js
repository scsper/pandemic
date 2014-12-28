/**
 * Actions to set up the initial state of the board
 */
var GameStore = require('../stores/game.js'),
    InfectionStore = require('../stores/infection.js'),
    InfectionActions = require('../actions/infection.js');

module.exports = {
    start: function() {
        var card = InfectionStore.getTopCard(),
            i,
            CARDS_TO_DRAW = 3,
            cubesToPlace = 3;

        while (cubesToPlace > 0) {
            for (i = 0; i < CARDS_TO_DRAW; i++) {
                InfectionActions.draw(card, cubesToPlace);
                card = InfectionStore.getTopCard();
            }

            cubesToPlace--;
        }
    }
};

