'use strict';

(function () {

  window.util = {
    WIZARD_NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    WIZARD_SURNAME: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    COLOR_COAT: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    COLOR_EYES: ['black', 'red', 'blue', 'yellow', 'green'],
    COLOR_FIREBALLS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    getRandomItem: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
  };
})();
