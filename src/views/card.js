define(function (require) {
    cardUI = {
        init: function (card) {
            let cardElement = document.createElement('div');
            cardElement.setAttribute('class', 'card');
            this.addSuit(cardElement,card);
            this.addRank(cardElement,card);
            return cardElement;
        },
        addSuit: function (cardElement, card) {
            let suitElement = document.createElement('img');
            suitElement.setAttribute('class', 'card_suit');
            suitElement.setAttribute('src', this.getSuitImgUrl(card.suit));
            cardElement.appendChild(suitElement);
        },
        addRank: function (cardElement, card) {
            let rankElement = document.createElement('span');
            rankElement.setAttribute('class', 'card_rank');
            rankElement.innerHTML = card.rank;
            cardElement.appendChild(rankElement);
        },
        getSuitImgUrl: function(suit) {
            return `../../images/${suit.toLowerCase()}.svg`;
        }
    }
    return cardUI;
});

