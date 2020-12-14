define(function (require) {
    const SuitDeck = require('./components/suitDeck.js');
    const suitDeckUI= require('./views/suitDeck.js');
    Game = {
        init: function() {

        },
        //deprecarted function
        initSuit: function () {
            //functional Suit Desk
            let spadeSuitDeck = new SuitDeck.init('spade');
            //create Ui deck with functional desk            
            return suitDeckUI.init(spadeSuitDeck);
        },
        appendToDocument: function (selector, element) {
            return selector.appendChild(element);
        }
    }
    console.log(document.getElementById('root'))
    Game.appendToDocument(document.getElementById('root'), Game.init());
});