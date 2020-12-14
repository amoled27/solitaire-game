actions = {
    deckClick: function () {
        return document.getElementById('closedDeck');
    },
    openDeck: function () {
        return document.getElementById('openDeck')
    }
}

actions.deckClick().onclick = function (e) {
    solitaire.getNewCardFromClosedDeck();
    solitaire.renderOpenDeck();
}

actions.openDeck().onclick = function (e) {
    let selectedCardId = e.target.dataset.click;
    console.log(selectedCardId)

    if (selectedCardId) {
        console.log(selectedCardId)
        solitaire.findCard(selectedCardId);
    } 
}

