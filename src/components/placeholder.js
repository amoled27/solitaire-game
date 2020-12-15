define (function() {
    Placeholder = {
        stack: [],
        type: '', //open, suit,
        suit: '',
        init: function(stack, type, suit) {
            this.stack = stack;
            this.type = type;
            if (suit) {
                this.suit = suit;
            }
        },
        pushCards: function (pushStack) {
            return  [...this.stack, ...pushStack];
        },
        popCards: function (index, length) {
            return  this.stack.splice(index, length); 
        }
    }
    return Placeholder;
});