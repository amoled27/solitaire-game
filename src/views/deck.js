define(function (require) {
    const cardUI = require('./card.js');
    const domUtil = require('../util/dom.js');
    DeckUI = {
        init: function (deck) {
            let deckElement =  this.createDOMMap(deck, card => {
                    let cardElement = cardUI.init(card);
                    return cardElement;
                }, {'class': 'deck', 'id': 'deck'});
                return deckElement;
        },
        createDOMMap: domUtil.createDOMMap
    }
    return DeckUI;
});