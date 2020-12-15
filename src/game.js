define(function (require) {
    const SuitDeck = require('./components/suitDeck.js');
    const suitDeckUI = require('./views/suitDeck.js');

    const Deck = require('./components/deck.js');
    const DeckUI = require('./views/deck.js');

    const Placeholder = require('./components/placeholder.js');
    const PlaceholderUI = require('./views/placeholder.js');

    const Card = require('./components/card.js');
    const CardUI = require('./views/card.js');

    const Stack = require('./components/stack.js');
    const StackUI = require('./views/stack.js');
    Game = {
        DOMMap: {},
        DOMMapKeys: { deck: 'deck', placeholder: 'placeholder', stack: 'stack', shuffleBtn: 'shuffleBtn' },
        suit: ['heart', 'clubs', 'diamond', 'spade'],
        deck: [],
        stack: [],
        initDeck: function () {
            this.deck = new Deck.init();
            console.log(this.deck);
        },
        initStack: function (index, noOfCards) {
            let stack = new Stack.init();
            console.log(stack, 'new ')
            for (let i = 0; i < noOfCards; i++) {
                stack.pushCard(this.deck.pop());
            }
            this.DOMMap['stack' + index] = StackUI.init(stack.cards);
            return stack;
        },
        appendToDocument: function (selector, element) {
            return selector.appendChild(element);
        },
        renderDomElements: function () {
            Object.keys(this.DOMMap).forEach(domElementKey => {
                let domElement = this.DOMMap[domElementKey];
                if (domElement) {
                    this.appendToDocument(document.getElementById('root'), domElement);
                }
            });
        },

    }
    Game.initDeck();
    let stackOne = Game.initStack(0, 2);
    let stackTwo = Game.initStack(1, 2);
    console.log(stackOne)
    console.log(stackTwo)
    Game.renderDomElements();

});
