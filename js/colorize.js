'use strict';

(function () {

  window.colorize = function (element, elementColors, input, property) {
    var randomElementColor = window.util.randomize(elementColors);
    if (property === 'fill') {
      element.style.fill = randomElementColor;
    } else {
      element.style.background = randomElementColor;
    }
    input.value = randomElementColor;
  };

})();
