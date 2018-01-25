'use strict';

(function () {
  var USER_DIALOG_STYLE_TOP = '80px';
  var USER_DIALOG_STYLE_LEFT = '50%';
  var userDialog = document.querySelector('.setup');

  userDialog.querySelector('.setup-similar').classList.remove('hidden');

  var userDialogOpen = document.querySelector('.setup-open');
  var userDialogClose = userDialog.querySelector('.setup-close');
  var userName = document.querySelector('.setup-user-name');

  var onPopupEscPress = function (evt) {
    var focused = document.activeElement;
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      if (focused === userName) {
        focused.blur();
      } else {
        closePopup();
      }
    }
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    returnSetupStartPosition(userDialog);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  userDialogOpen.addEventListener('click', function () {
    openPopup();
  });

  userDialogOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      openPopup();
    }
  });

  userDialogClose.addEventListener('click', function () {
    closePopup();
  });

  userDialogClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      closePopup();
    }
  });
  // Перетаскивание окна

  var dialogHandle = userDialog.querySelector('.setup-user-pic');

  dialogHandle.style.zIndex = 100;
  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };


    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Перетаскивание предметов

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;

  var renderOutline = function (color, style, width) {
    artifactsElement.style.outlineColor = color;
    artifactsElement.style.outlineStyle = style;
    artifactsElement.style.outlineWidth = width;
  };

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
    renderOutline('red', 'dashed', '2px');
  });

  window.addEventListener('mouseup', function () {
    renderOutline('', '', '');
  });

  var artifactsElement = document.querySelector('.setup-artifacts');

  artifactsElement.addEventListener('dragover', function (evt) {
    renderOutline('', '', '');
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    renderOutline('', '', '');
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
    evt.preventDefault();
  });


  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

  // возвращаем окну начальные координаты
  var returnSetupStartPosition = function () {
    userDialog.style.top = USER_DIALOG_STYLE_TOP;
    userDialog.style.left = USER_DIALOG_STYLE_LEFT;
  };

  var form = document.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), window.backend.onSuccess, window.backend.errorHandler);
  });
})();
