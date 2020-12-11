solitaire = {
    config: {
        openPlaceholdersLimit: 7,
        suitPlaceholders: 4,
        cardTypes: ['spade', 'clubs', 'hearts', 'diamond'],
        cardsLimit: 52,
        cardColors: ['black', 'red'],
        cardConstants: {
            king: 'K',
            queen: 'Q',
            jack: 'J',
            ace: 'A'
        }

    },
    selectedCard: {
        card: {},
        cardIndex: null
    },
    openPlaceholders: [],
    suitPlaceholders: [], //{type: , stack: }
    cardDeck: [],
    closedCardDeck: [],
    init: function () {

    },
    gameInitialization: function () {
        this.initializeCardDeck();
        this.initializeClosedDeck();
        this.initializeSuitPlaceholders();
        this.getNewCardFromClosedDeck();
    },

    //initialize 52 cards with their data and save in an array
    initializeCardDeck: function () {
        let cardTypeCount = 0;
        for (let index = 1; index <= this.config.cardsLimit; index++) {
            this.cardDeck.push(this.getCard(this.config.cardTypes[cardTypeCount], index));
            if (index % 13 === 0) {
                cardTypeCount++;
            }
        }
        this.cardDeck = this.shuffleDeck(this.cardDeck);
        this.initializeOpenPlaceholders();
    },

    //set open placeholders and inser cards 1 , 2, .... 
    initializeOpenPlaceholders: function () {
        let cardsCount = 0;
        for (let cardsLimit = 1; cardsLimit <= this.config.openPlaceholdersLimit; cardsLimit++) {
            let placeholder = [];
            for (let i = 0; i < cardsLimit; i++) {
                if (i === cardsLimit - 1) {
                    this.cardDeck[cardsCount].revealed = true;
                }
                this.cardDeck[cardsCount].placeholderIndex = cardsLimit - 1;
                placeholder.push(this.cardDeck[cardsCount]);
                cardsCount++;
            }
            this.openPlaceholders.push(placeholder);
        }
    },

    // initialize the closed deck i.e. remaining cards after setting open placeholders
    initializeClosedDeck: function () {
        let usedCardsCount = this.config.openPlaceholdersLimit * (this.config.openPlaceholdersLimit + 1) / 2;
        this.closedCardDeck = [...this.cardDeck];
        this.closedCardDeck.splice(0, usedCardsCount);
    },

    //card data structure | placeholder index  0-6 , 
    getCard: function (type, value) {
        return { type: type, color: this.getCardTypeColor(type), value: (value % 13) + 1, name: this.getCardName((value % 13) + 1), revealed: false, id: this.generateId(type, value), placeholderIndex: null }
    },

    generateId: function (type, value) {
        return type[0] + value;
    },

    //get card color based on type
    getCardTypeColor: function (cardType) {
        if (cardType === this.config.cardTypes[0] || cardType === this.config.cardTypes[1]) {
            return this.config.cardColors[0];
        } else {
            return this.config.cardColors[1];
        }
    },

    //get card names for cards like Ace, Jack, Queen
    getCardName: function (value) {
        switch (value) {
            case 1: return this.config.cardConstants.ace;
            case 11: return this.config.cardConstants.jack;
            case 12: return this.config.cardConstants.queen;
            case 13: return this.config.cardConstants.king;
            default: return value.toString();
        }
    },

    //shuffle cards in the deck
    shuffleDeck: function (deck) {
        let tempCard, currentIndex = deck.length;
        while (currentIndex !== 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            tempCard = deck[currentIndex];
            deck[currentIndex] = deck[randomIndex];
            deck[randomIndex] = tempCard;
        }
        return deck;
    },

    //if selectecard exists then click will attempt drop
    onCardClick: function (card, cardIdex) {
        if (card.id === this.selectedCard.card.id) {
            this.unSelectCard();
            return;
        }
        if (!card.revealed) {
            return;
        }
        if (Object.keys(this.selectedCard.card).length === 0) {
            this.selectCard(card, cardIdex);
        } else {
            this.dropCardOnOpenPlaceholder(card);
        }
    },

    //open placeholder drop execution
    dropCardOnOpenPlaceholder(card) {

        //drop placeholder has cards
        if (card && (this.isCardLower(card, this.selectedCard.card) && this.isColorOpposite(card, this.selectedCard.card))) {
            let dropPlaceholderIndex = card.placeholderIndex;
            let dropPlaceholder = this.openPlaceholders[dropPlaceholderIndex];
            let movingStack;

            //has original placeholder
            if (this.selectedCard.card.placeholderIndex !== null || this.selectedCard.card.placeholderIndex !== undefined) {
                let selectCardPlaceholder = this.selectedCard.card.placeholderIndex ? this.openPlaceholders[this.selectedCard.card.placeholderIndex] : [];
                let selectedCardIndex = this.selectedCard.cardIndex;
                movingStack = removeFromOriginalOpenPlaceholder(selectCardPlaceholder, selectedCardIndex);
                movingStack = this.updatePlaceholderIndices(movingStack, card.placeholderIndex);
                console.log(movingStack, 'updated');
            } else {
                //coming from the deck 
                let movingcard = this.selectedCard.card;
                movingcard.placeholderIndex = card.placeholderIndex;
                movingStack = [movingcard];
                this.removeFromOpenDeck();
            }

            this.addcardsToOpenPlaceholder(dropPlaceholder, movingStack);
        }
    },

    addcardsToOpenPlaceholder(dropPlaceholder, cardStack) {
        return dropPlaceholder.splice(dropPlaceholder.length, 0, ...cardStack)
    },

    updatePlaceholderIndices(array, newIndex) {
        return array.map(card => {
            card.placeholderIndex = newIndex
        })
    },

    onEmptyOpenPlaceholderClick(index) {
        if (this.isCardKing(this.selectedCard.card)) {
            if (this.selectedCard.cardIndex) {
                let originalPlaceholder = this.openPlaceholders[this.selectedCard.card.placeholderIndex];
                let movingArr = this.removeFromOriginalOpenPlaceholder(originalPlaceholder, this.selectedCard.cardIndex);
                this.addcardsToOpenPlaceholder(this.openPlaceholders[index], movingArr);
            } else {
                this.openPlaceholders[index].push(this.selectedCard.card);
                this.removeFromOpenDeck();
            }
        }
    },

    removeFromOriginalOpenPlaceholder(originalPlaceholder, selectedCardIndex) {
        return originalPlaceholder.splice(selectedCardIndex, (originalPlaceholder.length - selectedCardIndex));
    },

    removeFromOpenDeck() {
        this.closedCardDeck = this.closedCardDeck.slice(this.closedCardDeck.length - 1);
    },

    onEmptySuitPlaceholderClick(index) {
        if (this.isCardAce(this.selectedCard.card) && this.matchSuitDeck(this.suitPlaceholders[index], this.selectedCard.card)) {
            this.suitPlaceholders[index].cards.push(this.selectedCard.card);
           
            this.selectedCard.card.placeholderIndex? this.openPlaceholders[this.selectedCard.card.placeholderIndex].pop() : this.closedCardDeck.pop();
        }
    },

    //suit placeholder drop
    dropCardOnSuitPlaceholder(baseCard) {
        //not empty placeholder
        if (baseCard && this.matchSuitType(baseCard, this.selectedCard.card) && this.isCardHigher(baseCard, this.selectedCard.card)) {
            for (let index = 0; index < this.suitPlaceholders.length; index++) {
                if (this.suitPlaceholders[index].type === this.selectedCard.card.type) {
                    this.suitPlaceholders[index].cards.push(this.selectedCard.card);
                    if (this.selectedCard.card.placeholderIndex) { 
                        this.openPlaceholders[this.selectedCard.card.placeholderIndex].pop();
                    } else {
                        this.closedCardDeck.pop();
                    }
                    break;
                }
            }
        }
    },

    //hide and show card faces
    revealcard: function (card) {
        card.revealed = true;
        return card;
    },
    unrevealCard: function (card) {
        card.revealed = false;
        return card;
    },

    isCardKing: function (card) {
        return (card.name === this.config.cardConstants.king);
    },
    isCardAce: function (card) {
        return (card.name === this.config.cardConstants.ace);
    },

    matchSuitDeck: function (suitPlaceholder, card) {
        return (suitPlaceholder.type === card.type)
    },

    matchSuitType: function (baseCard, childCard) {
        return (baseCard.type === childCard.type);
    },
    // check if card deck,placeholders etc are empty
    isEmpty: function (array) {
        return (array.length === 0);
    },

    isCardLower: function (parentCard, childCard) {
        return (parentCard.value === childCard.value + 1);
    },

    isCardHigher: function (parentCard, childCard) {
        return (parentCard.value + 1 === childCard.value);
    },

    isColorOpposite: function (parentCard, childCard) {
        return (parentCard.color !== childCard.color);
    },



    //select unselect a card
    selectCard: function (card, cardIndex) {
        this.selectedCard = { card: card, cardIndex: cardIndex };
    },

    unSelectCard: function () {
        this.selectedCard = {};
    },

    //array roataion for deck
    getNewCardFromClosedDeck: function () {
        let lastCard = this.closedCardDeck[this.closedCardDeck.length - 1];
        for (let index = this.closedCardDeck.length - 1; index > 0; index--) {
            this.closedCardDeck[index] = this.closedCardDeck[index - 1];
        }
        this.closedCardDeck[0] = lastCard;
        return this.closedCardDeck[this.closedCardDeck.length - 1];
    },

    //set suit placeholder types
    initializeSuitPlaceholders: function () {
        for (let index = 0; index < this.config.suitPlaceholders; index++) {
            let suitPlaceholder = {
                type: this.config.cardTypes[index],
                cards: []
            }
            this.suitPlaceholders.push(suitPlaceholder);
        }
    },

    //reset game parameters
    resetGame: function () {
        this.selectedCard = {
            card: {},
            cardIndex: null
        };
        openPlaceholders = [];
        suitPlaceholders = [];
        cardDeck = [];
        closedCardDeck = [];
    }

}