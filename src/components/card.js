
define(function () {
   card = {
      suit: null,
      rank: '',
      id: 0,
      color: '',
      init: function(suit, rank) {
         this.suit = suit;
         this.rank = rank;
         this.color = (this.suit === 'diamond' || this.suit === 'heart') ? 'red' : 'black';
         return this;
      }
   }
   return card.init;
})