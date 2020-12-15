define(function (require) {
    const cardUI = require('./card.js');
    const domUtil = require('../util/dom.js');
    StackUI = {
        init: function (stack) {
            let stackElement =  this.createDOMMap(stack, card => {
                    let cardElement = cardUI.init(card);
                    return cardElement;
                }, {'class': 'stack', 'id': 'stack'});
                return stackElement;
        },
        createDOMMap: domUtil.createDOMMap
    }
    return StackUI;
});
