define(function (require) {
    const cardUI = require('./card.js');
    const domUtil = require('../util/dom.js');
    const Deck = require('../components/deck.js');
    DeckUI = {}
    DeckUI.openDeck = '';
    DeckUI.init = function (deck) {
        let deckElement = this.createDOMMap(deck, card => {
            let cardElement = cardUI.init(card);
            cardElement.onclick = DeckUI.onDeckClick;
            return cardElement;
        }, { 'class': 'deck', 'id': 'deck' });
        return deckElement;
    };
    DeckUI.createDOMMap = domUtil.createDOMMap;
    DeckUI.onDeckClick = function (e) {
      console.log(Deck)
    }
    return DeckUI;
});