define(function (require) {
    const cardUI = require('./card.js');
    const domUtil = require('../util/dom.js');
    DeckUI = {}
    DeckUI.init = function (deck) {
        let deckElement = this.createDOMMap(deck, card => {
            let cardElement = cardUI.init(card);
            return cardElement;
        }, { 'class': 'deck', 'id': 'deck' });
        deckElement.onclick = DeckUI.onDeckClick;
        return deckElement;
    },
        DeckUI.createDOMMap = domUtil.createDOMMap,
        DeckUI.onDeckClick = function (e) {
            console.log(e,'e');
            //rotate deck
        }
    return DeckUI;
});