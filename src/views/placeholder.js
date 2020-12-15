define(function (require) {
    PlaceholderUI = {
        init: function (placeholder) {
            return this.createPlaceholder(placeholder.type, placeholder.suit);
        },
        createPlaceholder: function (type, suit) {
            let placeholder = document.createElement('div');
            placeholder = this.setProperties(placeholder, suit, { 'class': 'placeholder' + ' ' + type});
            return placeholder;
        },
        setProperties: function (element, text, properties) {
            if (text) {
                element.innerText = text;
            }
            if (properties && Object.keys(properties).length) {
                Object.keys(properties).forEach(propertyKey => {
                    element.setAttribute(propertyKey, properties[propertyKey]);
                });
            }
            return element;
        }
    }
    return PlaceholderUI;
});