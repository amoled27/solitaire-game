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

    createDOMMap = function (array, createItemDOM, properties) {
        let arrayElement = document.createElement('div');
        if (properties && Object.keys(properties).length) {
            Object.keys(properties).forEach(propertyKey => {
                arrayElement.setAttribute(propertyKey, properties[propertyKey]);
            });
        }
        for (let i = 0; i < array.length; i++) {
            let itemElement = createItemDOM(array[i]);
            arrayElement.appendChild(itemElement);
        }
        return arrayElement;
    }
    return {
        createDOMMap
    }
});

