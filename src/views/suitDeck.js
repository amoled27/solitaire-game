define(function (require) {
    const cardUI = require('./card.js');
    const domUtil = require('../util/dom.js');
    suitDeckUI = {
        //view shuold always return dom element 
        init: function (suitDeck) {
            let suitDeckElement = this.createDOMMap(suitDeck, card => {
                let cardElement = cardUI.init(card);
                return cardElement;
            });
            return suitDeckElement;
        },
        createDOMMap: domUtil.createDOMMap,
    }
    return suitDeckUI;
});
