
define(function () {
   card = {
      suit: null,
      rank: '',
      id: 0,
      init: function(suit, rank) {
         this.suit = suit;
         this.rank = rank;
         return this;
      }
   }
   return card.init;
})