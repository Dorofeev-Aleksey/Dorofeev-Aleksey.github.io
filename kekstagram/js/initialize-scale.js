'use strict';

(function () {
  var STEP_RESIZE = 25;
  var MIN_RESIZE = 25;
  var MAX_RESIZE = 100;

  window.initializeScale = function (scaleElement, callback) {
    var buttonResizeDec = scaleElement.querySelector('.upload-resize-controls-button-dec');
    var buttonResizeInc = scaleElement.querySelector('.upload-resize-controls-button-inc');
    var controlSizeValue = scaleElement.querySelector('.upload-resize-controls-value');

    var buttonResizeClickHandler = function (evt) {
      var step = STEP_RESIZE;
      if (evt.currentTarget === buttonResizeDec) {
        step = -step;
      }
      var value = parseInt(controlSizeValue.value, 10) + step;
      if (value >= MIN_RESIZE && value <= MAX_RESIZE) {
        controlSizeValue.value = value + '%';
        callback(value);
      }
    };

    buttonResizeDec.addEventListener('click', buttonResizeClickHandler);
    buttonResizeInc.addEventListener('click', buttonResizeClickHandler);
  };
})();
