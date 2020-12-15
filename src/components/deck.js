define(function(require) {
    const Suit = require('./suitDeck.js');
    Deck = {};
    Deck.init = function (openDeck) {
        let suits = 'spade diamond clubs heart'.split(' ');
        let deck = [];
        for (let i = 0; i < suits.length; i++) {
            let suit = suits[i];
            let suitDeck = new Suit.init(suit);
            deck = [...deck, ...suitDeck];
        }
        return deck;
    };
    Deck.shuffle = function (deck) {
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
    };
    Deck.rotateCards = function (deck) {
        let lastEl = deck[deck.length - 1];
        for (let i = deck.length - 1; i > 0; i++) {
            deck[i] = deck[i - 1]
        }
        deck[0] = lastEl;
        return deck;
    };
    Deck.popCard = function () {
        //  return 
    };
    //deprecated
    Deck.popCards = function (deck, count) {
        let poppedCards = deck.splice((deck.length - count), count);
        return [deck, poppedCards];
    };
    return Deck;
});