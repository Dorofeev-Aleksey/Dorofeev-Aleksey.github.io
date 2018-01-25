'use strict';

(function () {
  window.initializeFilters = function (effectContainer, callback, filterDefault, applyFilter) {

    var effectButtons = effectContainer.querySelectorAll('.upload-effect-input');

    var onEffectPress = function (evt) {
      if (evt.target.checked) {
        var newPercent = 100;
        callback(newPercent);
        filterDefault(newPercent);

        var effectButtonsId = evt.target.id;
        applyFilter(effectButtonsId);
      }
    };

    for (var i = 0; i < effectButtons.length; i++) {
      effectButtons[i].addEventListener('change', onEffectPress);
    }
  };
})();
