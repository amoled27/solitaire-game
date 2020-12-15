define(function (require) {
    const Suit = require('./suitDeck.js');
    Deck = {
        init: function () {
            let suits = 'spade diamond clubs heart'.split(' ');
            let deck = [];
            for (let i = 0; i < suits.length; i++) {
                let suit = suits[i];
                let suitDeck = new Suit.init(suit);
                deck = [...deck, ...suitDeck];
            }
            return deck;
        },
        shuffle: function (deck) {
            let i = deck.length - 1;
            while (i > 0) {
                let randomIndex, tempCard;
                randomIndex = Math.floor(Math.random() * i);
                tempCard = deck[randomIndex];
                deck[randomIndex] = deck[i];
                deck[i] = tempCard;
                i--;
            }
            return deck;
        }
    }
    return Deck;
});