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
        deck: [],
        stack: [],
        removeBtn: {},
        selectedCard: null,
        init: function () {
            let placeholder = new Placeholder.init([], 'suit', 'spade');
            console.log(PlaceholderUI.init(placeholder));
            return PlaceholderUI.init(placeholder);
        },
        initDeck: function () {
            let deck = new Deck.init();
            this.deck = deck;
            return DeckUI.init(deck);
        },
        initCard: function () {
            let card = new Card('spade', 'A');
            let cardElement = CardUI.init(card)
            return cardElement;
        },
        initStack: function () {
            this.stack = new Stack.init();
            let cardOne = new Card('spade', 'A');
            let cardTwo = new Card('spade', 'K');
            this.stack.pushCard(cardOne);
            this.stack.pushCard(cardTwo);
            return StackUI.init(this.stack.cards);
        },
        reRenderStack: function () {
            console.log('in rerendr stack', this.stack.cards);
            return StackUI.init(this.stack.cards);
        },
        removeCard: function () {
            let cardOne = new Card('spade', 'A');
            this.stack.removeCard(cardOne);
        },
        createShuffleBtn: function () {
            return this.createBtn('Shuffle', { 'id': 'shuffleBtn' });
        },
        createRemoveCardBtn: function () {
            this.removeBtn = this.createBtn('Remove Card', { 'id': 'removeCardBtn' });
            return this.removeBtn;
        },
        createBtn: function (name, properties) {
            let btn = document.createElement('button');
            btn.innerHTML = name;
            this.setProperties(btn, properties);
            return btn;
        },
        setProperties: function (element, properties) {
            if (properties && Object.keys(properties).length) {
                Object.keys(properties).forEach(propertyKey => {
                    element.setAttribute(propertyKey, properties[propertyKey]);
                });
            }
            return element;
        },
        getShuffleBtn: function () {
            return document.getElementById('shuffleBtn');
        },
        getStackGenerateBtn: function () {
            return document.getElementById('removeCardBtn');
        },
        shuffleDeck: function () {
            let shuffledDeck = Deck.shuffle(this.deck);
            document.getElementsByClassName('deck')[0].remove();
            return DeckUI.init(shuffledDeck);
        },
        getDeck: function () {
            return document.getElementById('deck');
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
        },
        pushToStack(secondaryStack) {
            return secondaryStack.pop();
        }
    }
    console.log(document.getElementById('root'))
    Game.appendToDocument(document.getElementById('root'), Game.createShuffleBtn());
    Game.appendToDocument(document.getElementById('root'), Game.createRemoveCardBtn());
    Game.appendToDocument(document.getElementById('root'), Game.init());
    Game.appendToDocument(document.getElementById('root'), Game.initStack());
    Game.appendToDocument(document.getElementById('root'), Game.initDeck());

    Game.getShuffleBtn().onclick = function () {
        Game.appendToDocument(document.getElementById('root'), Game.shuffleDeck());
    };
    Game.removeBtn.onclick = function () {
        Game.removeCard();
        document.getElementById('stack').remove();
        Game.appendToDocument(document.getElementById('root'), Game.reRenderStack());
    };
});