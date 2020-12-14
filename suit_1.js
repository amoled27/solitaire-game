define(function (require) {
    const cardUI = require('./card.js');
    suitUI = {
        //view shuold always return dom element 
        init: function (suit) {
            let suitElement = this.createSuitElement();
            suit.map(card => {
                let cardElement = cardUI.init(card);
                suitElement.appendChild(cardElement);
            });
            return suitElement;
        },
        insertAfter: function (referenceNode, newNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        },
        createSuitElement: function () {
            let suitElement = document.createElement('div');
            suitElement.setAttribute('class', 'suit');
            return suitElement;
        }

    }
    return suitUI;
})
