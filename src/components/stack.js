define(function (require) {
    Stack = {}
    Stack.cards = [];
    Stack.init = function () {
        return Stack;
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
    return Stack;
});
