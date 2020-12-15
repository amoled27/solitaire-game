define(function (require) {
    const cardUI = require('./card.js');
    const domUtil = require('../util/dom.js');
    StackUI = {}
    StackUI.init = function (stack) {
        let stackElement = this.createDOMMap(stack, card => {
            let cardElement = cardUI.init(card);
            cardElement.onclick = StackUI.setStackReference
            return cardElement;
        }, { 'class': 'stack', 'id': 'stack' });
        return stackElement;
    };
    StackUI.createDOMMap = domUtil.createDOMMap;
    StackUI.setStackReference = function (event) {
    };
    return StackUI;
});
