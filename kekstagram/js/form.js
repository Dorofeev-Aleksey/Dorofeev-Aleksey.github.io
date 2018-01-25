'use strict';

(function () {

  var MAX_HASHTAGS = 5;
  var MAX_LENGTH_HASHTAG = 20;
  var MIN_LENGTH_HASHTAG = 2;
  var MAX_EFFECT_VALUE = 100;
  var MIN_EFFECT_VALUE = 0;
  var DEFAULT_EFFECT_VALUE = 100;

  var uploadInput = document.querySelector('.upload-input');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFormCancel = document.querySelector('.upload-form-cancel');
  var uploadFormDescription = document.querySelector('.upload-form-description');
  var uploadLevelElement = document.querySelector('.upload-effect-level');
  var uploadLevelInputElement = uploadLevelElement.querySelector('.upload-effect-level-value');
  var scopeElement = uploadLevelElement.querySelector('.upload-effect-level-line');
  var effectLevelPinElement = uploadLevelElement.querySelector('.upload-effect-level-pin');
  var effectLevelLineElement = uploadLevelElement.querySelector('.upload-effect-level-val');
  var uploadControlsElement = document.querySelector('.upload-effect-controls');
  var imagePreview = document.getElementById('effect-image-preview');
  var uploadResizeValue = document.querySelector('.upload-resize-controls-value');
  var uploadOverlayCloseBtn = uploadOverlay.querySelector('.upload-form-cancel');
  var inputHashtag = document.querySelector('.upload-form-hashtags');
  var inputEffectNone = document.querySelector('#upload-effect-none');

  uploadLevelInputElement.classList.add('hidden');
  uploadOverlayCloseBtn.setAttribute('style', 'font-size: 0;');

  var onOverlayEscPress = function (evt) {
    var focused = document.activeElement;
    if (evt.keyCode === window.preview.ESC_KEYCODE) {
      if (focused === uploadFormDescription) {
        focused.blur();
      } else {
        setDefaultForm();
        clearEffect();
        closeOverlay();
      }
    }
  };

  var clearEffect = function () {
    imagePreview.className = 'effect-image-preview'; // по умолчанию без фильтра
    imagePreview.style.transform = '';
    imagePreview.style.filter = '';
    uploadLevelElement.classList.add('hidden');
  };

  var setDefaultForm = function () {
    uploadLevelElement.classList.add('hidden');
    uploadLevelInputElement.style.display = 'none';
    uploadLevelInputElement.setAttribute('max', MAX_EFFECT_VALUE);
    uploadLevelInputElement.setAttribute('min', MIN_EFFECT_VALUE);
    uploadLevelInputElement.setAttribute('value', DEFAULT_EFFECT_VALUE);
    effectLevelPinElement.style.left = '100%';
    effectLevelLineElement.style.width = '100%';
    imagePreview.style = '';
    uploadResizeValue.value = '100%';
    inputHashtag.value = '';
    uploadFormDescription.value = '';
    inputEffectNone.checked = true;
    inputHashtag.style.border = '';
    inputHashtag.setCustomValidity('');
  };

  var openOverlay = function () {
    uploadOverlay.classList.remove('hidden');
    uploadLevelElement.classList.add('hidden');
    clearEffect();
    setDefaultForm();
    document.addEventListener('keydown', onOverlayEscPress);
  };

  var closeOverlay = function () {
    uploadOverlay.classList.add('hidden');
    setDefaultForm();
    clearEffect();
    document.removeEventListener('keydown', onOverlayEscPress);
  };

  uploadInput.addEventListener('change', function () {
    onUploadFileChange();
    setDefaultForm();
    clearEffect();
    openOverlay();
  });

  uploadFormCancel.addEventListener('click', function () {
    setDefaultForm();
    clearEffect();
    closeOverlay();
  });

  var onUploadFileChange = function () {
    var file = uploadInput.files[0];
    window.uploadPicture(file, imagePreview, openOverlay);
  };

  var form = document.querySelector('.upload-form');
  form.addEventListener('submit', function (evt) {
    validateHashtags(inputHashtag.value);
    window.backend.save(new FormData(form), window.backend.onSuccess, window.backend.onError);
    evt.preventDefault();
    uploadInput.value = null;
  });

  // ---Наложение фильтров

  var effectContainer = document.querySelector('.upload-effect__container');

  var filterDefault = function (percent) {
    effectLevelPinElement.style.left = percent + '%';
    effectLevelLineElement.style.width = percent + '%';
    uploadLevelInputElement.value = Math.round(percent);
  };

  var applyFilter = function (targetId) {
    if (targetId === 'upload-effect-none') {
      uploadLevelElement.classList.add('hidden');
    } else {
      uploadLevelElement.classList.remove('hidden');
    }
    targetId = targetId.substr(7) + '';
    imagePreview.classList.add(targetId);
  };

  var checkFilter = function (newPercent) {
    var filterElements = uploadControlsElement.querySelectorAll('input[type="radio"]');
    for (var i = 0; i < filterElements.length; i++) {
      if (filterElements[i].checked) {
        var filter = filterElements[i].value;
        var filterValue;

        switch (filter) {
          case 'none':
            filterValue = 'none';
            break;
          case 'chrome':
            filterValue = 'grayscale(' + String(parseFloat(newPercent / 100).toFixed(2)) + ')';
            break;
          case 'sepia':
            filterValue = 'sepia(' + String(parseFloat(newPercent / 100).toFixed(2)) + ')';
            break;
          case 'marvin':
            filterValue = 'invert(' + String(newPercent) + '%)';
            break;
          case 'phobos':
            filterValue = 'blur(' + String(Math.round((newPercent * 3) / 100)) + 'px)';
            break;
          case 'heat':
            filterValue = 'brightness(' + String(parseFloat((newPercent * 3) / 100).toFixed(1)) + ')';
            break;
        }
        imagePreview.style.filter = filterValue;
        return;
      }
    }
  };

  window.initializeFilters(effectContainer, checkFilter, filterDefault, applyFilter);

  // ---Изменение масштаба изображения

  var scaleElement = document.querySelector('.upload-resize-controls');

  var adjustScale = function (scale) {
    imagePreview.style.transform = 'scale(' + scale / 100 + ')';
  };

  window.initializeScale(scaleElement, adjustScale);

  // ---Валидация хэш-тэгов

  var validateHashtags = function (value) {
    var errorMessage = '';

    value = value.toLowerCase();
    var array = value.split(/\s+/g);

    if (array.length > MAX_HASHTAGS) {
      errorMessage += 'Не больше 5 хэш-тегов.\n';
    }

    for (var i = 0; i < array.length; i++) {
      if (array[i].length === 0) {
        break;
      }

      if (array[i].length > MAX_LENGTH_HASHTAG) {
        errorMessage += 'Длина хэш-тега не больше 20 символов.\n';
        break;
      }

      if (array[i][0] !== '#') {
        errorMessage += 'Хэш-тег должен начинаться с символа "#".\n';
        break;
      }

      if (array[i].length < MIN_LENGTH_HASHTAG + 1) {
        errorMessage += 'После символа "#" минимум ' + MIN_LENGTH_HASHTAG + ' знака.\n';
        break;
      }

      if (array[0].indexOf('#', 1) >= 0) {
        errorMessage += 'Хэш-теги отделяются пробелом.\n';
        break;
      }
    }

    for (i = 0; i < array.length - 1; i++) {
      if (~array.indexOf(array[i], i + 1)) {
        errorMessage += 'Запрещены повторяющие хэш-теги\n';
        break;
      }
    }

    if (errorMessage) {
      inputHashtag.setCustomValidity(errorMessage);
      inputHashtag.style.borderColor = 'red';
    } else {
      inputHashtag.setCustomValidity('');
      inputHashtag.style.border = '';
    }
  };

  inputHashtag.addEventListener('input', function () {
    validateHashtags(inputHashtag.value);
  });

  // Ползунок фильтров

  var getCoordsScope = function (elem) {
    var box = elem.getBoundingClientRect();

    return {
      left: box.left,
      right: box.right
    };
  };

  var getCoordsPin = function (mouseX) {
    var scopeEffectLevelPin = getCoordsScope(scopeElement);
    var newPercent = (mouseX - scopeEffectLevelPin.left) * 100 / (scopeEffectLevelPin.right - scopeEffectLevelPin.left);

    if (newPercent > 0 && newPercent < 100) {
      effectLevelPinElement.style.left = newPercent + '%';
      effectLevelLineElement.style.width = newPercent + '%';
      uploadLevelInputElement.value = Math.round(newPercent);
    }
    return newPercent;
  };

  effectLevelPinElement.addEventListener('mousedown', function (event) {
    event.preventDefault();

    var onMouseMove = function (moveEvent) {
      moveEvent.preventDefault();

      var newPercent = getCoordsPin(moveEvent.clientX);
      checkFilter(newPercent);
    };

    var onMouseUp = function (upEvent) {
      upEvent.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
