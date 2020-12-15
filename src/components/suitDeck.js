define(function (require) {
    const Card = require('./card.js');
    SuitDeck = {
        init: function (suit) {
            let ranks = 'A 2 3 4 5 6 7 8 9 10 J Q K'.split(' ');
            let suitDeck = [];
            for (let i = 0; i < 13; i++) {
                let rank = ranks[i];
                suitDeck.push(new Card(suit, rank));
            }
            return suitDeck;
        },
        popCard: function (deck) {
            deck.pop();
            deck;
        },
        pushCard: function (deck, card) {
            deck.push(card);
            deck;
        }
    }
    return SuitDeck;
})