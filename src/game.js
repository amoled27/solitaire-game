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
        removeBtn: {},
        selectedCard: null,
        initClosePlaceholders: function () {
            for (let i = 0; i < 4; i++) {
                let placeholder = this.initPlaceholder('suit', this.suit[i]);
            }
        },
        initOpenPlaceholders: function () {
            for (let i = 0; i < 7; i++)
                this.initPlaceholder('open', '', i);
        },
        initPlaceholder: function (type, suit, index) {
            let placeholder = new Placeholder.init([], type, suit);
            this.DOMMap['placeholder_' + (suit ? suit : index)] = PlaceholderUI.init(placeholder);
        },
        addCardsToPlaceholder: function (placeholder, cards) {
            placeholder.pushCards(cards);
            this.DOMMap['placeholder_' + placeholder.suit] = PlaceholderUI.init(placeholder);
        },
        initDeck: function () {
            let deck = new Deck.init();
            this.deck = deck;
            this.DOMMap['deck'] = DeckUI.init(deck);
        },
        initCard: function () {
            let card = new Card('spade', 'A');
            let cardElement = CardUI.init(card)
            return cardElement;
        },
        initStack: function (index) {
           this.createStack(index);
        },
        createStack: function (index) {
            let stack =  new Stack.init();
            let cardOne = new Card('spade', 'A');
            let cardTwo = new Card('spade', 'K');
            let cardThree = new Card('diamond', 'K');
            let cardArr = [cardOne, cardTwo, cardThree];
            stack.pushCardStack(cardArr);
            console.log('init stack', stack);
            this.DOMMap['stack' + index] = StackUI.init(stack.cards);
        },
        openCard: function () {

        },
        closeCard: function () {

        },
        pushCardsToStack: function (stack, cardArr) {
            this.stack.pushCardStack(cardArr);
            this.DOMMap['stack'] = StackUI.init(this.stack.cards);
        },
        reRenderStack: function () {
            return StackUI.init(this.stack.cards);
        },
        pushCardToDeck: function (deck) {
            this.DOMMap['deck'] = DeckUI.init(Deck.pushCard(deck, card));
        },
        popCardFromDeck: function () {
            this.DOMMap['deck'] = DeckUI.init(Deck.popCard(deck));
        },
        removeCard: function () {
            let cardTwo = new Card('spade', 'K');
            let cardThree = new Card('diamond', 'K');
            let cardArr = [cardTwo, cardThree];
            this.stack.removeCard(cardTwo);
            this.DOMMap['stack'] = StackUI.init(this.stack.cards);
        },
        createShuffleBtn: function () {
            this.DOMMap['shuffleBtn'] = this.createBtn('Shuffle', { 'id': 'shuffleBtn' });
        },
        createRemoveCardBtn: function () {
            this.DOMMap['removeCardBtn'] = this.createBtn('Remove Card', { 'id': 'removeCardBtn' });
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
            this.DOMMap[this.DOMMapKeys.deck] = DeckUI.init(shuffledDeck);
            this.reRenderDomElement(this.DOMMapKeys.deck);
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
        },
        renderDomElements: function () {
            Object.keys(this.DOMMap).forEach(domElementKey => {
                let domElement = this.DOMMap[domElementKey];
                if (domElement) {
                    this.appendToDocument(document.getElementById('root'), domElement);
                }
            });
        },
        reRenderDomElement: function (elementKey) {
            document.getElementById('root').innerHTML = '';
            this.renderDomElements();
        }
    }
    Game.createShuffleBtn();
    Game.createRemoveCardBtn();
    Game.initDeck();
    // Game.initStack();
    // Game.initOpenPlaceholders();
    Game.initPlaceholder();
    // Game.initClosePlaceholders();
    Game.renderDomElements();

    Game.getShuffleBtn().onclick = function () {
        Game.shuffleDeck();
    };
    Game.DOMMap['removeCardBtn'].onclick = function () {
        Game.removeCard();
        Game.reRenderDomElement();
    };
});
