Card
Description: 
    A single card 

Properties: 
    suit: type of card ('♠︎ ♥︎ ♣︎ ♦︎')
    rank: rank of the card (A 2 3 4 5 6 7 8 9 10 J Q K)

Deck 
Description:
    has 52 cards, 13 of each of the 4 SuitDecks
Properties:
    shuffle: function that shuffles the cards
    sort: function that sorts the cards

Stack
Description: 
    collection of cards
Properties:
    openCard: function to open the card
    closeCard: function to close the card
    pushCard: function to push a card or a stack of cards
    popCard: function to remoce a card or a stack of cards

SuitDeck:
Description: 
    collection of 13 cards of single suit

OpenStack
Description: 
    collection of open cards

ClosedStack
Description: 
    collection of closed cards

Placeholder
Description:
    container that holds stack of cards 
Properties: 
    pushCard: function to push a card or a stack of cards
    popCard: function to remoce a card or a stack of cards

PlaceholderStack
Description:
    collection of card with top card open and rest cards closed

Game
Description:
    Solitaire game
Properties:
    match: {boolean}    
            @params {Card} Card object
            @params {Card} Card object






