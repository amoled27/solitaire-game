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
        deck: {},
        stack: [],
        removeBtn: {},
        selectedCard: {},
        openDeck: {},
        selectedCard: null,
        initClosePlaceholders: function () {
            for (let i = 0; i < 4; i++) {
                let placeholder = this.initPlaceholder('suit', this.suit[i]);
            }
        },
        initOpenPlaceholders: function () {
            let count = 0
            for (let i = 0; i < 7; i++) {
                count++;
                let [DOMMapKey, placeholderElement] = this.initPlaceholder('open', '', i);
                let placeholderCards = this.popCardsFromDeck(this.deck.cards, count);
                this.DOMMap[DOMMapKey] = PlaceholderUI.displayCards(placeholderElement, placeholderCards);
            }
        },
        initPlaceholder: function (type, suit, index) {
            let placeholderIdentifier = suit ? suit : index;
            let placeholder = new Placeholder.init([], type, suit);
            let placeholderUI = PlaceholderUI.init(placeholder);
            placeholderUI.setAttribute('data-id', placeholderIdentifier);
            this.DOMMap['placeholder_' + placeholderIdentifier] = placeholderUI;
            return ['placeholder_' + placeholderIdentifier, placeholderUI];
        },
        addCardsToPlaceholder: function (placeholder, cards, identfier) {
            placeholder.pushCards(cards);
            this.DOMMap['placeholder_' + identfier] = PlaceholderUI.init(placeholder);
        },
        initDeck: function () {
            this.deck = new Deck.init(this.openDeck);
            this.DOMMap['deck'] = DeckUI.init(this.deck.cards);
        },
        displayOpenDeck: function () {
            this.openDeck = new Deck.initOpenDeck(this.deck);
            this.pushToOpenDeck();
        },
        pushToOpenDeck: function() {
            let poppedCard = this.popCardsFromDeck(this.deck.cards, 1);
            this.openDeck.deck.push(...poppedCard);
            console.log(this.openDeck)
            this.DOMMap['open-deck'] = DeckUI.init(this.openDeck.deck);
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
            let stack = new Stack.init();
            let cardOne = new Card('spade', 'A');
            let cardTwo = new Card('spade', 'K');
            let cardThree = new Card('diamond', 'K');
            let cardArr = [cardOne, cardTwo, cardThree];
            stack.pushCardStack(cardArr);
            this.DOMMap['stack' + index] = StackUI.init(stack.cards);
        },
        pushCardsToStack: function (stack, cardArr, index) {
            stack.pushCardStack(cardArr);
            this.DOMMap['stack' + index] = StackUI.init(stack.cards);
        },
        popCardFromStack: function (stack) {

        },
        reRenderStack: function () {
            return StackUI.init(this.stack.cards);
        },
        pushCardToDeck: function (deck) {
            this.DOMMap['deck'] = DeckUI.init(Deck.pushCard(deck, card));
        },
        popCardsFromDeck: function (deck, count) {
            let poppedCards;
            [this.deck.cards, poppedCards] = Deck.popCards(deck, count);
            this.DOMMap['deck'] = DeckUI.init(this.deck.cards);
            return poppedCards;
        },
        removeCard: function (index) {
            let cardTwo = new Card('spade', 'K');
            let cardThree = new Card('diamond', 'K');
            let cardArr = [cardTwo, cardThree];
            this.stack.removeCard(cardTwo);
            this.DOMMap['stack' + index] = StackUI.init(this.stack.cards);
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
            let shuffledDeck = Deck.shuffle(this.deck.cards);
            this.deck.cards = shuffledDeck;
            if (document.getElementsByClassName('deck')[0]) {
                document.getElementsByClassName('deck')[0].remove();
            }
            this.DOMMap[this.DOMMapKeys.deck] = DeckUI.init(shuffledDeck);
            this.displayOpenDeck(shuffledDeck[shuffledDeck.length - 1]);
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
        reRenderDomElement: function () {
            document.getElementById('root').innerHTML = '';
            this.renderDomElements();
        },

    }

    Game.initDeck();
    Game.renderDomElements();
    Game.shuffleDeck();
    Game.displayOpenDeck();
    Game.initOpenPlaceholders();
    Game.reRenderDomElement();

    // Game.DOMMap['removeCardBtn'].onclick = function () {
    //     Game.reRenderDomElement();
    // };


    // Game.createShuffleBtn();
    // Game.getShuffleBtn().onclick = function () {
    //     Game.shuffleDeck();
    // };
});
