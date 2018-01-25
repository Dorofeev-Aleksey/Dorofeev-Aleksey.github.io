'use strict';

(function () {

  window.colorizeElement = function (elem, colors, callback) {
    elem.addEventListener('click', function () {
      var colorElement = window.util.getRandomItem(colors);
      callback(elem, colorElement);
    });
  };
})();
