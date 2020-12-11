solitaire = {
    config: {
        openPlaceholdersLimit: 7,
        suitPlaceholders: 7,
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

    //card data structure
    //placeholder index  0-6 , 
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
    onCardClick: function (card) {
        if (card.id === this.selectedCard.card.id) {
            this.unSelectCard();
            return;
        }
        if (!card.revealed) {
            return;
        }
        //check if card is selected , no 
        if (Object.keys(this.selectedCard.card).length === 0) {
            this.selectCard(card);
        } else {
            this.dropCardOnOpenPlaceholder(card);
        }
    },

    onEmptyPlaceholderClick() {

    },

    //open placeholder drop execution
    dropCardOnOpenPlaceholder(card) {
        if (this.isCardLower(card, this.selectedCard.card) && this.isColorOpposite(card, this.selectedCard.card)) {
            let dropPlaceholderIndex = card.placeholderIndex;
            let dropPlaceholder = this.openPlaceholders[dropPlaceholderIndex];
            let movingStack = card;

            if (this.selectedCard.card.placeholderIndex !== null || this.selectedCard.card.placeholderIndex !== undefined) {
                let selectCardPlaceholder = this.openPlaceholders[this.selectedCard.card.placeholderIndex];
                let selectedCardIndex = this.selectedCard.cardIndex;
                movingStack = selectCardPlaceholder.splice(selectedCardIndex, (selectCardPlaceholder.length - selectedCardIndex));
            }

            dropPlaceholder.splice(dropPlaceholder.length, 0, ...movingStack);

        }
    },
    checkCardMatchSuit() {

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

    // check if card deck,placeholders etc are empty
    isEmpty: function (array) {
        return (array.length === 0);
    },

    isCardLower: function (parentCard, childCard) {
        return (parentCard.value === childCard.value + 1);
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

}