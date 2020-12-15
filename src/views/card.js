define(function (require) {
    cardUI = {
        init: function (card) {
            let cardElement = document.createElement('div');
            cardElement.setAttribute('class', 'card');
            cardElement = this.addSuit(cardElement, card);
            cardElement = this.addRank(cardElement, card);
            cardElement.onclick = this.onCardClick;
            return cardElement;
        },
        addSuit: function (cardElement, card) {
            let suitElement = document.createElement('img');
            suitElement.setAttribute('class', 'card_suit');
            suitElement.setAttribute('src', this.getSuitImgUrl(card.suit));
            cardElement.appendChild(suitElement);
            return cardElement;
        },
        addRank: function (cardElement, card) {
            let rankElement = document.createElement('span');
            rankElement.setAttribute('class', 'card_rank');
            rankElement.innerHTML = card.rank;
            cardElement.appendChild(rankElement);
            return cardElement;
        },
        getSuitImgUrl: function (suit) {
            return `../../images/${suit.toLowerCase()}.svg`;
        },
        onCardClick: function (event) {
            console.log(event.target.parentNode, '1')
            if (event.target.nodeName === 'DIV') {
                event.target.classList.toggle('selectedCard');
            } else {
                event.target.parentNode.classList.toggle('selectedCard');
            }
        }
    }
    return cardUI;
});

