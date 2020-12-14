define(function () {
    /**
      * @params {DOMElement} createItemDOM function that creates an item DOM from array element
      * 
      * Example:
      *  let numberArr = [1,2,3,4];
      *  let numberArrElement = numberArr.createDOMMap(number => {
      *       let numberElement = document.createElement('span');
      *       numberElement.innerHTML = number;
      *       return numberElement;
      *  });
      *  
      **/

    createDOMMap = function (array, createItemDOM) {
        let arrayElement = document.createElement('div');
        for (let i = 0; i < array.length; i++) {
            let itemElement = createItemDOM(array[i]);
            console.log(itemElement);
            arrayElement.appendChild(itemElement);
        }
        return arrayElement;
    }
    return {
        createDOMMap
    }
});

