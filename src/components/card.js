
define(function () {
   card = {
      suit: null,
      rank: '',
      id: 0,
      color: '',
      isOpen: false,
      init: function(suit, rank) {
         this.suit = suit;
         this.rank = rank;
         this.isOpen = false;
         this.color = (this.suit === 'diamond' || this.suit === 'heart') ? 'red' : 'black';
         return this;
      },
      toggleCard: function (card) {
         card.isOpen ? card.classLists.remove('closed_card') : card.classLists.add('closed_card');
         card.isOpen = !card.isOpen; 
      }
   }
   return card.init;
})