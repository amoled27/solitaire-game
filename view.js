generateView = {
    init: function () {

    },
    layoutInit: function () {
        let solitaireNode = document.getElementById('solitaire');
        solitaireNode.setAttribute('style', 'display: flex');
        this.renderClosedDeck();
        this.renderPlayArea();
        this.createSuitPlaceholderPane();
        this.createOpenPlaceholderpane();
    },
    renderClosedDeck: function () {
        let div = this.createDiv("id", "closedDeckPane");
        div.setAttribute('style', 'background: #c7c5c5;min-width: 20em; min-height: 100px; display: flex; justify-content: center');
        document.getElementById('solitaire').appendChild(div);

        let closedDeck = this.createUnrevealedCard("id", "closedDeck");
        this.getClosedDeckPane().appendChild(closedDeck);
    },
    renderOpenDeck: function (card) {
        if (document.getElementsByClassName('openDeck')[0]) {
            document.getElementsByClassName('openDeck')[0].remove();
        }
       let openDeck = this.createRevealedCard(card, 'id', 'openDeck');
        openDeck.setAttribute('class', 'openDeck');
        openDeck.setAttribute('data-click', card.id);
        // document.getElementById('closedDeck').appendChild(openDeck);
        this.insertAfter(document.getElementById('closedDeck'), openDeck);
    },
    getClosedDeckPane() {
        return document.getElementById("closedDeckPane");
    },
    createDiv: function (attribute, value) {
        let div = document.createElement('DIV');
        div.setAttribute(attribute, value);
        return div;
    },
    renderPlayArea: function () {
        let div = this.createDiv("id", "playArea");
        div.setAttribute('style', 'background: #ecabab; min-width: 40em; min-height: 25em; display: inline-block;');
        document.getElementById('solitaire').appendChild(div);
    },
    createUnrevealedCard: function (attribute, value, cardData) {
        let card = this.createDiv(attribute, value);
        let cardStyles = `width: 7em;
                        background: #ff8a8a;
                        height: 10em;
                        text-align: center;
                        border: 6px solid #fff;
                        display: inline-block;`;
        if (cardData && Object.keys(cardData).length) {
            card.setAttribute('id', cardData.id);
            card.setAttribute('data-click', cardData.id);
        }
        card.setAttribute('style', cardStyles);
        return card;
    },
    createRevealedCard: function (card, attribute, value) {
        let revealedCard = this.createDiv(attribute, value);
        let cardStyles = `width: 7em;
        background: #f7efef;
        height: 10em;
        text-align: center;
        border: 6px solid #ffaeae;
        margin-top: 2px;
        margin-left: 10px;
        display: inline-block`;

        revealedCard.setAttribute('style', cardStyles);

        revealedCard.setAttribute('id', card.id);
        revealedCard.setAttribute('data-click', card.id);
        let cardImg = this.getCardImage(card.type);
        revealedCard.appendChild(cardImg);

        let cardName = document.createElement('p');
        let cardNameStyles = `font-size: 38px;
        margin: 5px;
        font-weight: 600;
        color: ${this.getColor(card.color)};`
        cardName.innerText = card.name;
        cardName.setAttribute('style', cardNameStyles);
        revealedCard.appendChild(cardName);
        return revealedCard;
    },
    getColor: function (color) {
        if (color === 'red') {
            return '#e84e65';
        } 
        return '#000';
    },
    getCardImage: function (type){
        let img = document.createElement('img');
        let imgLink;
        switch (type) {
            case 'spade': {
                imgLink = './images/050-spade.svg';
                break;
            };
            case 'diamond': {
                imgLink = './images/049-diamond.svg';
                break;
            };
            case 'clubs': {
                imgLink = './images/048-clover.svg';
                break;
            };
            case 'hearts': {
                imgLink = './images/047-heart.svg';
                break;
            };
        }
        img.setAttribute('src', imgLink);
        img.setAttribute('style', `width: 73%;margin-top: 10px;`)
        return img;
    },
    createSuitPlaceholderPane: function () {
        let suitPane = this.createDiv('id', 'suit_pane');
        suitPane.setAttribute('style', 'display: flex');
        document.getElementById('playArea').appendChild(suitPane);
    },
    createOpenPlaceholderpane: function () {
        let openPane = this.createDiv('id', 'open_pane');
        document.getElementById('playArea').appendChild(openPane);
    },
    setSuitPlaceholder: function(suit) {
        console.log(suit, 'dssdssd')
        let suitPlaceholder = this.createDiv('class', 'suitPlaceholder');
        suitPlaceholder.setAttribute('id', 'suit' + suit.type);
        suitPlaceholder.setAttribute('style', `width: 7em;
        height: 8.5em;
        border: 3px dotted #848484;
        margin: 40px;
        text-align: center;`);
        let suitText = this.setSuitPlaceholderText(suit);
        suitPlaceholder.appendChild(suitText);
        document.getElementById('suit_pane').appendChild(suitPlaceholder);
        
    },
    setSuitPlaceholderText: function (suit) {
        let suitText = document.createElement('p');
        suitText.innerText = suit.type;
        suitText.setAttribute('class', 'suitText');
        return suitText;
    },
    setopenPlaceholder: function (id) {
        let suitPlaceholder = this.createDiv('class', 'openPlaceholder');
        suitPlaceholder.setAttribute('data-click', id)
        suitPlaceholder.setAttribute('style', `width: 7em;
        height: 8.5em;
        border: 3px dotted #848484;
        margin: 40px;
        text-align: center;
        display: inline-block;
        margin-left: 80px;`);
        document.getElementById('open_pane').appendChild(suitPlaceholder);
    },
    setAttributeForElements: function(element, attributeObj, classArr, id) {
        //set Attributes
        Object.keys(attributeObj).forEach((attr, index) => {
            element.setAttribute(attr, attributeObj[attr]);
        });
         //set class
         classArr.forEach((_class, index) => {
            element.setAttribute('class', _class);
        });

        element.setAttribute('id', id);
        return element;
    },
    insertAfter: function(referenceNode, newNode)  {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
      },

      selectOpenDeckCard: function (card) {
          let openCard = document.getElementById('openDeck');
          openCard.style.outline = '5px solid #0e8400';
      },
      unSelectOpenDeckCard: function (card) {
        let openCard = document.getElementById('openDeck');
        openCard.style.outline = 'none';
    },
    renderOpenPlaceholders: function(id) {
        this.setopenPlaceholder(id);
    },
    addOpenCard: function (card, first, refId) {
        console.log(card)
        let playCard = card.revealed ? this.createRevealedCard(card, 'id', card.id) : this.createUnrevealedCard('id', card.id, card);
        playCard.setAttribute('class', 'card')
        if (first) {
            //append to open placeholder
            document.getElementById('open_pane').appendChild(playCard);

        } else {
            this.insertAfter(document.getElementById(refId),playCard );
        }
    }
}

generateView.layoutInit();