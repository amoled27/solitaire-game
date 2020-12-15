define(function (require) {
    Stack = {}
    Stack.cards = [];
    Stack.init = function () {
        return  Object.assign({}, Stack);
    };
    Stack.pushCard = function (card) {
        this.cards.push(card);
    };
    Stack.popCard = function () {
        this.cards.pop();
    };
    Stack.removeCard = function (targetCard) {
        let index = this.cards.map(card => {
            return card.suit + card.rank 
        }).indexOf(targetCard.suit + targetCard.rank);
        if (index > -1) {
            this.cards.splice(index,1);
            return true;
        }
        return false;
    }
    //deprecated
    Stack.pushCardStack = function (stack) {
        this.cards = [...this.cards, ...stack];
        return this.cards;
    },
    Stack.removeCardStack =  function (stack) {
        let stackFirstCard = stack[0];
        let cardIndex = this.cards.map(card => card.rank + card.suit).indexOf(stackFirstCard.rank + stackFirstCard.suit);
        this.cards.splice(cardIndex, stack.length);
    }
    return Stack;
});
